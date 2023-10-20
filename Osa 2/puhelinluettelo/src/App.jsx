import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {
  // State hooks for managing application data
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ text: "", type: "" })

  // State hook for managing the need to refresh data from the server
  const [refreshNeeded, setRefreshNeeded] = useState(true)

  // Effect hook for initializing persons data or refreshing it when needed
  useEffect(() => {
    if (refreshNeeded) {
      console.log('initialize persons')
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          setRefreshNeeded(false) // Data has been refreshed
        })
    }
  }, [refreshNeeded])

  // Function for displaying notifications with a timeout
  const setNotification = (content) => {
    setMessage(content)
    setTimeout(() => {
      setMessage({ text: "", type: "" })
    }, 5000)
  }

  // Function to handle adding a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()

    if (newName != "" && newNumber != "") {
      const personObject = {
        name: newName,
        number: newNumber
      }

      const existingPerson = persons.find(person => person.name === newName)

      // Check if person already exists and confirm update
      if (existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("person already in phonebook")
        personService.update(existingPerson.id, personObject)
          .then(initialPersons => {
            // Update the persons state with the updated person
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : initialPersons))
            console.log(`Person  ${existingPerson.name} was edited`)
          })
          .catch(error => {
            console.error(`Error editting person: ${error}`)
            setNotification({ text: `Error editting person: ${newName}`, type: "error" })
            setRefreshNeeded(true) // Trigger data refresh after an error
          })

      }
      else {
        // Create a new person
        personService.create(personObject).then(initialPersons => {
          setPersons(persons.concat(initialPersons)) // Add the new person to the persons state
          setNotification({ text: `${personObject.name} added`, type: "success" })
          setNewName("")
          setNewNumber("")
          console.log(`person ${JSON.stringify(personObject)} added`)
        })
      }
    }
    else {
      setNotification({ text: `Enter name and number`, type: "error" })
    }
  }

  // Function to handle removing a person from the phonebook
  const removePerson = (id, name) => (() => {
    console.log("trying to remove person")
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id)); // Remove the person from the persons state
          setNotification({ text: `Person ${name} removed`, type: "success" })
          console.log(`Person ${name} removed from the server`);
        })
        .catch(error => {
          console.error(`Error removing person: ${error}`);
          setRefreshNeeded(true) // Trigger data refresh after an error
        })
    }
  }
  )

  // ... (handlers for input changes and filtering)
  const handelNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handelFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))


  // JSX rendering of the application components
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handelFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handelNameChange}
        onNumberChange={handelNumberChange}
        onSubmit={addPerson}
      />
      <Notification message={message} />
      <h3>Numbers</h3>
      <Numbers persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App