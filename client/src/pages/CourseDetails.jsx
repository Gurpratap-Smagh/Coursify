import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { isSafeUrl } from "./../utilis";

export default function CourseDetails() {
  const { title } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get("/users/purchasedCourses", { withCredentials: true })
      .then((res) => {
        const found = res.data.find((c) => c.title === title);
        setCourse(found);
      });
  }, [title]);

  if (!course) return <p>Loading...</p>;

  const safeImage =
    course.imagelink && isSafeUrl(course.imagelink)
      ? course.imagelink
      : "/fallback.jpg";

  return (
    <div>
      <h2>{course.title}</h2>
      <img src={safeImage} alt={course.title} />
      <p>{course.description}</p>
    </div>
  );
}
