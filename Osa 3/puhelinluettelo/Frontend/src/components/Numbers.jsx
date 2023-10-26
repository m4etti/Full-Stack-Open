import Person from './Person'

const Numbers = ({ persons, removePerson }) => (
  <div>
    <ul>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          removePerson={removePerson}
        />
      ))}
    </ul>
  </div>
)

export default Numbers