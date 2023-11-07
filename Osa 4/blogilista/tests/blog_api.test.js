const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let usersInDb = []

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)

    await Blog.deleteMany({})

    usersInDb = await helper.usersInDb()

    const initialBlogs = helper.initialBlogs.map(blog => {
        const user = usersInDb.find(user => user.username === blog.user)
        return { ...blog, user: user.id }
    })
    await Blog.insertMany(initialBlogs)

    usersInDb = await helper.getTokens(usersInDb)
})

describe('GET /api/blogs', () => {
    test('GET all', async () => {
        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/application\/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
        expect(response.body[0].id).toBeDefined()
    })

    test('Empty database', async () => {
        // Clear all blogs from the database
        await Blog.deleteMany({})

        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
    })

    describe('GET /api/blogs/:id', () => {
        test('valid id', async () => {
            const blogsInDb = await helper.blogsInDb()
            const selectedBlog = {
                ...blogsInDb[1],
                user: blogsInDb[1].user.toString()
            }

            const response = await api.get(`/api/blogs/${selectedBlog.id}`)

            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toMatch(/application\/json/)
            expect(response.body).toEqual(selectedBlog)
        })

        test('malformed id', async () => {
            const malformedId = '564564564'
            const response = await api.get(`/api/blogs/${malformedId}`)
            expect(response.status).toBe(400)
            expect(response.body.error).toBe('malformatted id')
        })

        test('non-existent id', async () => {
            const nonExistentId = '6540da7345d6422ea10b062e'
            const response = await api.get(`/api/blogs/${nonExistentId}`)
            expect(response.status).toBe(404)
            expect(response.body.error).toBe('Blog not found')
        })
    })
})

describe('POST /api/blogs', () => {
    test('new blog is added', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'test test',
            url: 'http://test.com',
            likes: 2
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${usersInDb[0].token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const blogs = blogsAtEnd.map(blog => {
            return { title: blog.title, user: blog.user.toString() }
        })
        expect(blogs).toContainEqual({ title: newBlog.title, user: usersInDb[0].id })
    })

    test('if likes not given 0 likes', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'test test',
            url: 'http://test.com',
        }
        const response = await api

            .post('/api/blogs')
            .set('Authorization', `Bearer ${usersInDb[0].token}`)
            .send(newBlog)

        expect(response.body.likes).toEqual(0)
    })

    test('if title or author missin code 400 ', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogWhitoutTitle = {
            author: 'test test',
            url: 'http://test.com',
        }
        const blogWhitoutAuthor = {
            title: 'Test blog',
            url: 'http://test.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${usersInDb[0].token}`)
            .send(blogWhitoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${usersInDb[0].token}`)
            .send(blogWhitoutAuthor)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('missing authentication returns 401', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const newBlog = {
            title: 'Test blog',
            author: 'test test',
            url: 'http://test.com',
            likes: 2
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)

        expect(response.status).toBe(401)
        expect(response.body.error).toBe('token missing or invalid')

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('invalid authentication token returns 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const newBlog = {
            title: 'Test blog',
            author: 'test test',
            url: 'http://test.com',
            likes: 2
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer INVALID_TOKEN')
            .send(newBlog)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('invalid token')

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
})

describe('DELETE /api/blogs/:id', () => {
    test('wanted blog is removed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[1]

        const user = usersInDb.find(user => user.id === blogToDelete.user.toString())

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const titlesAtEnd = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        expect(titlesAtEnd).not.toContain(blogsAtStart[1].title)
    })

    test('malformed id gives 400', async () => {
        const id = '4353'
        const response = await api.delete(`/api/blogs/${id}`)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('malformatted id')
    })

    test('non-existent id gives 404', async () => {
        const id = '6540da7345d6422ea10b062e'
        const response = await api.delete(`/api/blogs/${id}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Blog not found')
    })

    test('missing authentication returns 401', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const response = await api.delete(`/api/blogs/${blogToDelete.id}`)
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('token missing or invalid')

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('invalid authentication token returns 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const response = await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'Bearer INVALID_TOKEN')
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('invalid token')

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
})

describe('PUT /api/blogs/:id', () => {
    test('wanted blog is edited', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[1]
        const user = usersInDb.find(user => user.id === blogToUpdate.user.toString())

        const id = blogToUpdate.id
        const likes = { likes: 100000 }

        await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .send(likes)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtEnd[1].likes).toEqual(100000)
    })

    test('malformed id gives 400', async () => {
        const id = '4353'
        const likes = { likes: 100000 }

        const response = await api
            .put(`/api/blogs/${id}`)
            .send(likes)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('malformatted id')
    })

    test('non-existent id gives 400', async () => {
        const id = '6540da7345d6422ea10b062e'
        const likes = { likes: 100000 }

        const response = await api
            .put(`/api/blogs/${id}`)
            .send(likes)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Blog not found')
    })

    test('missing authentication returns 401', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[1]
        const likes = { likes: 100000 }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(likes)

        expect(response.status).toBe(401)
        expect(response.body.error).toBe('token missing or invalid')

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtEnd[1].likes).toEqual(blogToUpdate.likes)
    })

    test('invalid authentication token returns 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[1]
        const likes = { likes: 100000 }

        const response = await api
            .delete(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', 'Bearer INVALID_TOKEN')
            .send(likes)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('invalid token')

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtEnd[1].likes).toEqual(blogToUpdate.likes)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})