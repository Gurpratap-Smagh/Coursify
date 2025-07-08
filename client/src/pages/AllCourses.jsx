import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const { token, rank } = useContext(AuthContext);

  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    // Load all published courses
    axios
      .get("/users/courses", { withCredentials: true })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    // Load purchased courses
    axios
      .get("/users/purchasedCourses", { withCredentials: true })
      .then((res) => setPurchased(res.data))
      .catch((err) => console.error(err));

    if (rank === "admin" && token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAdminId(payload.id);
    }
  }, [rank, token]);

  const buyCourse = (title) => {
    axios
      .post(`/users/courses/${title}`, {}, { withCredentials: true })
      .then(() => {
        toast.success("purchased!");
        // refresh purchased list
        axios
          .get("/users/purchasedCourses", { withCredentials: true })
          .then((res) => setPurchased(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="course-grid">
      {courses.map((c) => {
        const alreadyBought = purchased.some(
          (p) => p.title === c.title
        );

        let showEdit = false;
        let showBuy = false;

        if (rank === "admin") {
          if (c.creatorId === adminId) {
            showEdit = true;
          } else {
            showBuy = !alreadyBought;
          }
        } else {
          showBuy = !alreadyBought;
        }

        return (
          <CourseCard
            key={c.title}
            course={c}
            showEdit={showEdit}
            showBuy={showBuy}
            alreadyBought={alreadyBought}
            onBuy={() => buyCourse(c.title)}
            isAdmin={rank === "admin"}
          />
        );
      })}
    </div>
  );
}

