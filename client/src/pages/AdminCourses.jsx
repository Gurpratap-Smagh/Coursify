import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/admin/courses", { withCredentials: true })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <button onClick={() => navigate("/admin/courses/create")}>
        Add New Course
    </button>
    <div className="course-grid">
      {courses.length === 0 && <p>No courses yet. Add your first one!</p>}
      {courses.map((c) => (
        <CourseCard key={c.title} course={c} showEdit isAdmin />
      ))}
    </div>
  );
}
