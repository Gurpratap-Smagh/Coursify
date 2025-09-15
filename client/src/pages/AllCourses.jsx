import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const { token, rank, loading } = useContext(AuthContext);

  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    // 1. Everyone gets the public list of courses from the new endpoint
    axios
      .get("/courses") 
      .then((res) => setCourses(res.data))
      .catch((err) => {
        console.error("Error loading courses:", err);
        toast.error("Could not load courses.");
      });

    // 2. If the user is logged in, separately get their private data
    if (token) {
      axios
        .get("/users/purchasedCourses", { withCredentials: true })
        .then((res) => setPurchased(res.data))
        .catch((err) => console.error("Error loading purchased courses:", err));

      if (rank === "admin") {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setAdminId(payload.id);
      }
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

  // Show loading state while AuthContext is checking authentication
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="course-grid">
      {courses.map((c) => {
        const alreadyBought = purchased.some(
          (p) => p.title === c.title
        );

        let showEdit = false;
        let showBuy = false;

        // Only show buy/edit options if user is authenticated
        if (token) {
          if (rank === "admin") {
            if (c.creatorId === adminId) {
              showEdit = true;
            } else {
              showBuy = !alreadyBought;
            }
          } else {
            showBuy = !alreadyBought;
          }
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

