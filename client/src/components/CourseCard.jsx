import { Link } from "react-router-dom";
import { isSafeUrl } from "./../utilis";

export default function CourseCard({
  course,
  showBuy,
  onBuy,
  showEdit,
  alreadyBought
}) {
  // Validate image link
  const safeImage =
    course.imagelink && isSafeUrl(course.imagelink)
      ? course.imagelink
      : "/fallback.jpg";

  // Validate course link
  const safeLink =
    course.link && isSafeUrl(course.link)
      ? course.link
      : null;

  return (
    <div className="course-card">
      {safeLink ? (
        <a href={safeLink} target="_blank" rel="noopener noreferrer">
          <img src={safeImage} alt={course.title} />
          <h3>{course.title}</h3>
        </a>
      ) : (
        <>
          <img src={safeImage} alt={course.title} />
          <h3>{course.title}</h3>
        </>
      )}

      <p>{course.description?.slice(0, 50)}...</p>

      {showEdit && (
        <Link to={`/admin/courses/edit/${course.title}`}>
          Edit
        </Link>
      )}

      {showBuy && (
        <button onClick={onBuy}>Buy</button>
      )}

      {!showBuy && !showEdit && alreadyBought && (
        <p className="test-success">
          Purchased!
        </p>
      )}
    </div>
  );
}
