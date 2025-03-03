function Course({ course }) {
  const total = course.parts.reduce((total, cur) => total + cur.exercises, 0);
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map((c) => (
          <li key={c.id}>
            {c.name} - {c.exercises}
          </li>
        ))}
      </ul>
      <strong>total of {total} exercises</strong>
    </div>
  );
}

export default Course;
