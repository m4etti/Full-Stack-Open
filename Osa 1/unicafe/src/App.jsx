import { useState } from 'react'

const StatisticLine = ({ text, value }) =>(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Feedback = (props) => {
  const setToValue = (value, setValue) => () => {setValue(value+1)}

  return (
    <div>
      <h2>Anna palautetta</h2>
      <Button text="hyvä" handleClick={setToValue(props.good, props.setGood)}/>
      <Button text="neutraali" handleClick={setToValue(props.neutral, props.setNeutral)}/>
      <Button text="huono"handleClick={setToValue(props.bad, props.setBad)}/>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) =>{
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all
  
  if (all != 0){
    return(
        <div>
          <h2>Tilastot</h2>
          <table>
            <tbody>
              <StatisticLine text="Hyva" value={good}/>
              <StatisticLine text="Neutraali" value={neutral}/>
              <StatisticLine text="Huono" value={bad}/>
              <StatisticLine text="Kaikki" value={all}/>
              <StatisticLine text="Keskiarvo" value={average}/>
              <StatisticLine text="Positiivisia" value={positive}/>
            </tbody>
          </table>
        </div>
    )
  }
  else{
    return(
      <div>
        <h2>Tilastot</h2>
        <p>Ei vielä yhtään palutetta</p>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App