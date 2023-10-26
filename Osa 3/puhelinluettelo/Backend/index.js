// Import necessary modules
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// Define a custom error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    // Handle specific error cases
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'NotFoundError') {
        return response.status(400).json({ error: 'Person not in database' })
    }
    next(error)
}

// Define a custom morgan token for logging request data
morgan.token('data', (request) => {
    return JSON.stringify(request.body)
})

// Middleware setup
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// Get information about the API
app.get('/info', (request, response) => {
    // Format the current date and time
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        hour12: false
    }
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date())

    // Respond with API info
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people.</p>
        <p>${formattedDate}</p>`)
    })
})

// Get a list of persons from the database
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// Get a specific person by their ID
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

// Delete a person by their ID
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

// Create a new person
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
})

// Update a person's information by their ID
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            // Check if updatedPerson is null (person not found in the database)
            if (!updatedPerson) {
                // Create a custom error and pass it to the next middleware
                const error = new Error()
                error.name = 'NotFoundError'
                throw error
            }
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// Handle unknown API endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Use the custom error handler for all errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
