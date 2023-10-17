import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Mostvoted =(props) => {
  const index = props.votes.reduce((accumulator, current, index) => {
    return current > props.votes[accumulator] ? index : accumulator;
  }, 0);

  return (
    <div>
      <h2>Eniten ääniä saanut anekdootti</h2>
      <p>{props.anecdotes[index]}</p>
      <p>{props.votes[index]} ääntä.</p>
    </div>

  )
}

const Anecdote = (props) => {
  const setToRandom = (setValue) => () => {setValue(props.rand)}
  const addVote = (selected) => () => {
    const copy = [...props.votes]
    copy[selected] += 1
    props.setVotes(copy)
  }
  return(
    <div>
      <h2>Päivän anekdootti</h2>
      <p>{props.anecdotes[props.selected]}</p>
      <p>Ääniä {props.votes[props.selected]}</p>
      <Button text="Äänetsä" handleClick={addVote(props.selected)}/>
      <Button text="Seuraava anekdootit" handleClick={setToRandom(props.setSelected)}/>
    </div>
  )
}

const App = () => {
  const rand = () => Math.floor(Math.random() * 8);
  const [selected, setSelected] = useState(rand)
  const [votes, setVotes] = useState(Array(8).fill(0))
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} setSelected={setSelected} rand={rand} votes={votes} setVotes={setVotes}/>
      <Mostvoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App