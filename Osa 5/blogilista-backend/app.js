const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

// Connecting to MongoDB database
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

// Express middleware setup
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Assigning routes to specific URL paths
app.use(
    '/api/blogs',
    middleware.tokenExtractor,
    middleware.userExtractor,
    blogsRouter
)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Route for testing
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

// Handling unknown endpoints
app.use(middleware.unknownEndpoint)

// Handling errors in the application
app.use(middleware.errorHandler)

module.exports = app