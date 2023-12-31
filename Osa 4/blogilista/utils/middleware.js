const logger = require('./logger')
const jwt = require('jsonwebtoken')

// Middleware for logging incoming requests
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

// Middleware for handling errors in the application
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'invalid token' })
    }

    next(error)
}

// Middleware for extracting token from the request header
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization?.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    else {
        request.token = null
    }
    next()
}

// Middleware for extracting user data from the request headers token
const userExtractor = (request, response, next) => {
    if (request.token) {
        request.user = jwt.verify(request.token, process.env.SECRET).id
    }
    else {
        request.user = null
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}