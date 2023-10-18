import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "0405054853"
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    if (newName != "" && newNumber != ""){
      const personObject ={
        name: newName,
        number: newNumber
      }

      const isPersonInAlready = persons.some(person => person.name === newName)

      if (isPersonInAlready){
        alert(`${newName} is already added to phonebook`)
      }
      else{
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber("")
      }
    }
    else {
      alert(`Enter name and number`)
    }
  }

  const handelNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handelNumberChange =(event) => {
    setNewNumber(event.target.value)
  }

  const handelFilterChange =(event) => {
    setfilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handelFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handelNameChange}
        onNumberChange={handelNumberChange}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Numbers persons={personsToShow}/>
    </div>
  )
}

export default App