import { useEffect, useState } from "react";
import axios from "axios";
import Courses from "../components/Courses";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Home() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:8000/users/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleBuy = (title) => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:8000/users/courses/${title}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => toast.success("course purchased"))
      .catch(() => toast.error("Failed to buy course"))
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px" }}>
      {courses.map((course) => (
        <Courses key={course.title} course={course} onBuy={handleBuy} />
      ))}
    </div>
  );
}

export default Home;
