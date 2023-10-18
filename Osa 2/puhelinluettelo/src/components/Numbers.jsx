import Person from './Person'

const Numbers = ({ persons }) => (
    <div>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  )

export default Numbers