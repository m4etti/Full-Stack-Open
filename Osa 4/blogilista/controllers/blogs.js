const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.author || !body.title) {
        response.status(400).json({ error: 'Author and title are required fields' })
    }
    else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })

        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const removed = await Blog.findByIdAndRemove(request.params.id)
    response.status(removed ? 204 : 400).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const likes = request.body.likes
    const id = request.params.id

    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
    // response.json(updatedBlog)

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter