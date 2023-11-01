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

test('GET /api/blogs', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(response.body[0].id).toBeDefined()
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


afterAll(async () => {
    await mongoose.connection.close()
})