import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { isSafeUrl } from "./../utilis";

export default function PurchasedCourses() {
  const [courses, setCourses] = useState([]);
  const { token, rank } = useContext(AuthContext);

  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    axios
      .get("/users/purchasedCourses", { withCredentials: true })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    if (rank === "admin" && token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAdminId(payload.id);
    }
  }, [rank, token]);

  return (
    <div className="course-grid">
      {courses.length === 0 && (
        <p style={{ color: "gray" }}>
          You have not purchased any courses yet.
        </p>
      )}

      {courses.map((c) => {
        // Validate image link
        const safeImage =
          c.imagelink && isSafeUrl(c.imagelink)
            ? c.imagelink
            : "/fallback.jpg";

        // Validate external link if present
        let safeLink =
          c.link && isSafeUrl(c.link) ? c.link : null;

        // Default values
        let linkPath;
        if (safeLink) {
          linkPath = safeLink;
        } else {
          linkPath = `/users/courses/${c.title}`;
        }

        let isEdit = false;

        if (rank === "admin") {
          if (c.creatorId === adminId) {
            // Admin owns this course → should see Edit
            linkPath = `/admin/courses/edit/${c.title}`;
            isEdit = true;
          } else if (c.link) {
            // Purchased from another admin and has external link
            linkPath = safeLink || `/users/courses/${c.title}`;
          } else {
            // Purchased from another admin, link to details page
            linkPath = `/users/courses/${c.title}`;
          }
        } else {
          if (c.link) {
            linkPath = safeLink || `/users/courses/${c.title}`;
          } else {
            linkPath = `/users/courses/${c.title}`;
          }
        }

        // Render edit card for admins if they own the course
        if (rank === "admin" && isEdit) {
          return (
            <Link key={c.title} to={linkPath}>
              <div className="course-card">
                <img src={safeImage} alt={c.title} />
                <h3>{c.title}</h3>
                <p>{c.description?.slice(0, 50)}...</p>
                <p style={{ color: "green", marginTop: "8px" }}>
                  (Your Course - Edit Mode)
                </p>
              </div>
            </Link>
          );
        } else if (c.link && rank === "admin") {
          return (
            <a
              key={c.title}
              href={linkPath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="course-card">
                <img src={safeImage} alt={c.title} />
                <h3>{c.title}</h3>
                <p>{c.description?.slice(0, 50)}...</p>
              </div>
            </a>
          );
        } else if (c.link && rank === "user") {
          return (
            <a
              key={c.title}
              href={linkPath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="course-card">
                <img src={safeImage} alt={c.title} />
                <h3>{c.title}</h3>
                <p>{c.description?.slice(0, 50)}...</p>
              </div>
            </a>
          );
        } else {
          return (
            <Link key={c.title} to={linkPath}>
              <div className="course-card">
                <img src={safeImage} alt={c.title} />
                <h3>{c.title}</h3>
                <p>{c.description?.slice(0, 50)}...</p>
                <p style={{ color: "green", marginTop: "8px" }}>
                  Purchased!
                </p>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
