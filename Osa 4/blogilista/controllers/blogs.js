const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const User = require('../models/user')

// Route: GET all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

// Route: GET a specific blog by ID
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).json({ error: 'Blog not found' })
    }
})

// Route: POST a new blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.user.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    else if (!body.author || !body.title) {
        response.status(400).json({ error: 'Author and title are required fields' })
    }
    else {
        const user = await User.findById(request.user.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
})

// Route: DELETE a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
    const blogToBeRemoved = await Blog.findById(request.params.id)

    if (!blogToBeRemoved) {
        response.status(404).json({ error: 'Blog not found' })
    }
    else if (!request.user.id || request.user.id !== blogToBeRemoved.user.toString()) {
        return response.status(401).json({ error: 'token invalid' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()


})

// Route: PUT (update) a blog's likes by ID
blogsRouter.put('/:id', async (request, response) => {
    const likes = request.body.likes
    const id = request.params.id

    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).json({ error: 'Blog not found' })
    }
})

module.exports = blogsRouter