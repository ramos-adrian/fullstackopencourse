const Header = props => (
    <h1>{props.course}</h1>
)

const Part = p => (<p>{p.name} {p.size}</p>)
const Content = props => {
    return (
        <>
            <Part name={props.parts[0].name} size={props.parts[0].exercises}/>
            <Part name={props.parts[1].name} size={props.parts[1].exercises}/>
            <Part name={props.parts[2].name} size={props.parts[2].exercises}/>
        </>
    )
}

const Total = (props) => (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
)
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default App;
