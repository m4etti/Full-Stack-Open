const mongoose = require('mongoose');

// Check if password is provided as an argument
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument.');
    process.exit(1);
}

const password = process.argv[2];

// MongoDB connection URL
const url = `mongodb+srv://mattivout:${password}@cluster0.pucdpvb.mongodb.net/phonebook?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Person schema and model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

// Check if name and number are provided as arguments
if (process.argv[3] && process.argv[4]) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    // Save the new person to the database
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    // If no name and number provided, display all persons in the database
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
