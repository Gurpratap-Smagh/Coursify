import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, rank, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Determine homepage link depending on authentication and role
  const getHomeLink = () => {
    if (!token) {
      return "/users/courses"; // Unauthenticated users go to courses without buy option
    }
    return rank === "admin" ? "/admin/courses" : "/users/courses";
  };

  return (
    <nav className="navbar">
      {/* Clickable CourseHub logo */}
      <h1>
        <Link to={getHomeLink()} style={{ textDecoration: "none", color: "inherit" }}>
          CourseHub
        </Link>
      </h1>

      {token ? (
        // Authenticated user navbar
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
      ) : (
        // Unauthenticated user navbar
        <div className="nav-right">
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </nav>
  );
}

