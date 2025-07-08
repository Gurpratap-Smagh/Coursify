import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate();
  const rank = Cookies.get("rank");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("rank");
    navigate("/login");
  };

  // Determine homepage link depending on role
  const homeLink =
    rank === "admin"
      ? "/admin/courses"
      : "/users/courses";

  return (
    <nav className="navbar">
      {/* Clickable CourseHub logo */}
      <h1>
        <Link to="/users/courses" style={{ textDecoration: "none", color: "inherit" }}>
          CourseHub
        </Link>
      </h1>

      {rank && (
        <>
        <div className="nav-right">
          {rank === "user" && (
            <>
              <Link to="/users/purchased">My Courses</Link>
            </>
          )}
          {rank === "admin" && (
            <>
              <Link to="/admin/courses">My Courses</Link>
              <Link to="/users/purchased">Purchased Courses</Link>
            </>
          )}
          
        </div>
        <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

