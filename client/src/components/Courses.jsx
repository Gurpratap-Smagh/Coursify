function Courses({ course, onBuy }) {
  return (
    <div className="course-card">
      <img src={course.imagelink} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={() => onBuy(course.title)}>Buy Course</button>
    </div>
  );
}

export default Courses;
