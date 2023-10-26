const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// Custom validation for phonenumber
function validatePhoneNumber(phoneNumber) {
    // Valid formats: 09-1234556 or 040-22334455
    const regex = /^(\d{3}-\d{4,}|\d{2}-\d{5,})/ 
    return regex.test(phoneNumber);
}

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
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)