import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        role === "admin" ? "/admin/signup" : "/users/signup",
        { [role === "admin" ? "admin_name" : "user_name"]: username, password }
      );
      toast.success("Signup success, login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      try {
        if (err.response?.data?.error?.issues?.length > 0) {
          const issues = err.response.data.error.issues;
          const message = issues
            .map((issue) => {
              const field = issue.path?.[0] || "Field";
              return `${field}: ${issue.message}`;
            })
            .join(" ");
          toast.error(message);
          return;
        } else if (err.response?.data?.message) {
          toast.error(err.response.data.message);
          return;
        }
      } catch (e) {
        console.error("Error while parsing error object:", e);
      }

 
      toast.error("signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Sign up</button>
      <p onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#3b82f6" }}>
        Already have an account? Log in.
      </p>
    </div>
  );
}


