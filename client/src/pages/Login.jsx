import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        role === "admin" ? "/admin/login" : "/users/login",
        { [role === "admin" ? "admin_name" : "user_name"]: username, password },
        { withCredentials: true }
      );

      await login(res.data.token, res.data.rank);

      if (res.data.rank === "admin") {
        navigate("/admin/courses");
      } else {
        navigate("/users/courses");
      }

    } catch (err) {
      if (err.response?.status === 429) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 403) {
        toast.warn(err.response.data.message);
      } else {
        toast.error("Login failed.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>
        Welcome to <span style={{ color: "#3b82f6" }}>coursify</span>
      </h2>
      <p className="subtext">Log in to access paid content!</p>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select 
        title="Role"
        aria-label="Select your role"
        value={role} 
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/signup")}>
        Don’t have an account? Sign up.
      </p>
    </div>
  );
}
