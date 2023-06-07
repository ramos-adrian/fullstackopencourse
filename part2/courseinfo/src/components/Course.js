const Header = ({course}) => <h1>{course}</h1>

const Total = ({sum}) => <p><b>Total of {sum} exercises</b></p>

const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({parts}) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part}/>
        )}
    </>

const Course = ({course}) => {
    const totalExercises = course.parts.reduce((s, p) => s + p.exercises, 0);
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total sum={totalExercises}/>
        </div>
    )
}

export default Course