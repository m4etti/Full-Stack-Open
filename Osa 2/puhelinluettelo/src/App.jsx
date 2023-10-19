import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  //console.log(personService)

  useEffect(() => {
    console.log('initialize persons')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    if (newName != "" && newNumber != "") {
      const personObject = {
        name: newName,
        number: newNumber
      }

      const existingPerson = persons.find(person => person.name === newName)
      //console.log(existingPerson)

      if (existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("person already in phonebook")
        personService.update(existingPerson.id, personObject)
          .then(initialPersons => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : initialPersons))
            console.log(`Person  ${existingPerson.name} was edited`)
          })
          .catch(error => {
            console.error(`Error Editting person: ${error}`)
          })

      }
      else {
        personService.create(personObject).then(initialPersons => {
          setPersons(persons.concat(initialPersons))
          setNewName("")
          setNewNumber("")
          console.log(`person ${JSON.stringify(personObject)} added`)
        })
      }
    }
    else {
      alert(`Enter name and number`)
    }
  }

  const handelNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handelNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handelFilterChange = (event) => {
    setfilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const removePerson = (id, name) => (() => {
    console.log("trying to remove person")
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          console.log(`Person ${name} removed from the server`);
        })
        .catch(error => {
          console.error(`Error removing person: ${error}`);
        })
    }
  }
  )

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
      <h3>Numbers</h3>
      <Numbers persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App