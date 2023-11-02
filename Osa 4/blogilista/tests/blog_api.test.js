const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
    test('GET all', async () => {
        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/application\/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
        expect(response.body[0].id).toBeDefined()
    })

    describe('GET /api/blogs/:id', () => {
        test('valid id', async () => {
            const blogsInDb = await helper.blogsInDb()
            const id = blogsInDb[1].id
            const response = await api.get(`/api/blogs/${id}`)

            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toMatch(/application\/json/)
            expect(response.body).toEqual(blogsInDb[1])
        })

        test('malformed id', async () => {
            const malformedId = '564564564'
            const responseMalformedId = await api.get(`/api/blogs/${malformedId}`)
            expect(responseMalformedId.status).toBe(400)
        })

        test('non-existent id', async () => {
            const nonExistentId = '6540da7345d6422ea10b062e'
            const responseNonExistentId = await api.get(`/api/blogs/${nonExistentId}`)
            expect(responseNonExistentId.status).toBe(404)
        })
    })

})



describe('POST /api/blogs', () => {
    test('new blog is added', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'test test',
            url: 'http://test.com',
            likes: 2,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const blogs = blogsAtEnd.map(blog => blog.title)
        expect(blogs).toContain('Test blog')
    })

    test('if likes not given 0 likes', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'test test',
            url: 'http://test.com',
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.body.likes).toEqual(0)
    })

    test('if title or author missin code 400 ', async () => {
        const blogWhitoutTitle = {
            author: 'test test',
            url: 'http://test.com',
        }
        const blogWhitoutAuthor = {
            title: 'Test blog',
            url: 'http://test.com',
        }

        await api.post('/api/blogs').send(blogWhitoutTitle).expect(400)
        await api.post('/api/blogs').send(blogWhitoutAuthor).expect(400)
    })
})


describe('DELETE /api/blogs/:id', () => {
    test('wanted blog is removed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const id = blogsAtStart[1].id

        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const titlesAtEnd = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        expect(titlesAtEnd).not.toContain(blogsAtStart[1].title)
    })

    test('malformed id gives 400', async () => {
        const id = '4353'
        await api.delete(`/api/blogs/${id}`).expect(400)
    })

    test('non-existent id gives 400', async () => {
        const id = '6540da7345d6422ea10b062e'
        await api.delete(`/api/blogs/${id}`).expect(400)
    })
})

describe('PUT /api/blogs/:id', () => {
    test('wanted blog is edited', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const id = blogsAtStart[1].id
        const likes = { likes: 100000 }

        await api
            .put(`/api/blogs/${id}`)
            .send(likes)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtEnd[1].likes).toEqual(100000)
    })

    test('malformed id gives 400', async () => {
        const id = '4353'
        const likes = { likes: 100000 }
        await api.put(`/api/blogs/${id}`)
            .send(likes)
            .expect(400)
    })

    test('non-existent id gives 400', async () => {
        const id = '6540da7345d6422ea10b062e'
        const likes = { likes: 100000 }
        await api.put(`/api/blogs/${id}`)
            .send(likes)
            .expect(404)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})