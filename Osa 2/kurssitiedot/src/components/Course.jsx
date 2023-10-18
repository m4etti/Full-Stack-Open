const Total =(props) => {
    const sum = props.parts.map(part => part.exercises).reduce((total, current) => total + current,0)
  
    return (
      <div>
          <p><strong>Number of exercises {sum}</strong></p>
      </div>
    )
}
  
const Part = (props) =>(
    <div>
        <p>{props.part.name} {props.part.exercises}</p>
    </div>
)

const Content = (props) =>{
    return (
        <div>
        {props.course.parts.map((part, i) => (<Part key={i} part={part} />))}
        <Total parts={props.course.parts}/>
        </div>
    )
}

const Header = (props) =>{
    return (
        <div>
        <h1>{props.course.name}</h1>
        </div>
    )
}

const Course = (props) => {
    return(
        <div>
        <Header course={props.course}/>
        <Content course={props.course}/>
        </div>
    )
}

export default Course