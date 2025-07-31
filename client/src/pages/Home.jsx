import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Courses from "../components/Courses";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext";


function Home() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("/users/courses", { withCredentials: true })
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, [token, navigate]);

  const handleBuy = (title) => {
    axios
      .post(`/users/courses/${title}`, {}, { withCredentials: true })
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
