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
        </a>
      ) : (
        <img src={safeImage} alt={course.title} />
      )}
      
      <div className="course-card-content">
        {safeLink ? (
          <a href={safeLink} target="_blank" rel="noopener noreferrer">
            <h3>{course.title}</h3>
          </a>
        ) : (
          <h3>{course.title}</h3>
        )}
        
        <p>{course.description?.slice(0, 100)}...</p>
      </div>

      <div className="course-card-actions">
        {showEdit && (
          <Link to={`/admin/courses/edit/${course.title}`}>
            Edit Course
          </Link>
        )}

        {showBuy && (
          <button onClick={onBuy}>Buy Course</button>
        )}

        {!showBuy && !showEdit && alreadyBought && (
          <span className="purchased-badge">
            ✓ Purchased
          </span>
        )}
      </div>
    </div>
  );
}
