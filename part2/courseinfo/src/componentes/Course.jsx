function Course({ course }) {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}
function Header({ course }) {
    return <h1>{course}</h1>;
}

function Part({ part }) {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
}
function Content({ parts }) {
    return (
        <>
            {parts.map((part) => (
                <Part part={part} key={part.id} />
            ))}
        </>
    );
}

function Total({ parts }) {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0);
    return <b>total of {total} exercises</b>;
}

export default Course;
