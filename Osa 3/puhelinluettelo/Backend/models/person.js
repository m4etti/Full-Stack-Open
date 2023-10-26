const mongoose = require('mongoose')
require('dotenv').config()

// Disable strictQuery mode for Mongoose
mongoose.set('strictQuery', false)

// Get MongoDB URI from environment variables
const url = process.env.MONGODB_URI

console.log('connecting to', url)
// Connect to MongoDB
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// Custom validation function for phone numbers
function validatePhoneNumber(phoneNumber) {
    // Valid formats: 09-1234556 or 040-22334455
    const regex = /^(\d{3}-\d{4,}|\d{2}-\d{5,})/
    return regex.test(phoneNumber)
}

// Define the schema for the 'Person' collection in MongoDB
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: validatePhoneNumber,
            message: 'Invalid phone number format. Valid formats: 09-1234556 or 040-22334455'
        }
    }
})

// Define toJSON method to customize JSON output
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)