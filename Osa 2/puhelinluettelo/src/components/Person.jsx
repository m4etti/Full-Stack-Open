const Person = ({ person, removePerson }) => (
    <li>
      {person.name} &nbsp;
      {person.number} &nbsp;
      <button onClick={removePerson(person.id, person.name)}>X</button>
    </li>
  )

export default Person