import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminCourses from "./pages/AdminCourses";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import AllCourses from "./pages/AllCourses";
import PurchasedCourses from "./pages/PurchasedCourses";
import CourseDetails from "./pages/CourseDetails";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function App() {
  const { token, rank, loading } = useContext(AuthContext);

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    const hue1 = (210 + scrollPercent * 50) % 360;
    const hue2 = (hue1 + 30) % 360;

    document.body.style.background = `linear-gradient(135deg, 
      hsl(${hue1}, 40%, 8%), 
      hsl(${hue2}, 40%, 12%)
    )`;
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {token && <Navbar role={rank} />}

      <Routes>
        {/* Public pages */}
        <Route
          path="/login"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : !token ? (
              <Login />
            ) : (
              <Navigate to={rank === 'admin' ? '/admin/courses' : '/users/courses'} replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : !token ? (
              <Register />
            ) : (
              <Navigate to={rank === 'admin' ? '/admin/courses' : '/users/courses'} replace />
            )
          }
        />

        {/* Admin pages (protected) */}
        <Route
          path="/admin/courses"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token && rank === "admin" ? (
              <AdminCourses />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/courses/create"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token && rank === "admin" ? (
              <CreateCourse />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/courses/edit/:title"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token && rank === "admin" ? (
              <EditCourse />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* User pages (protected) */}
        <Route
          path="/users/courses"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token && (rank === "user" || rank === "admin") ? (
              <AllCourses />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/users/purchased"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token && (rank === "user" || rank === "admin") ? (
              <PurchasedCourses />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/users/courses/:title"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token && (rank === "user" || rank === "admin") ? (
              <CourseDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Wildcard */}
        <Route
          path="*"
          element={
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading...</p>
              </div>
            ) : token ? (
              rank === "admin" ? (
                <Navigate to="/admin/courses" replace />
              ) : (
                <Navigate to="/users/courses" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </BrowserRouter>
  );
}
