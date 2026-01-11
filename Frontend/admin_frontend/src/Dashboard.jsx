import { useState } from "react";
import axios from "axios";

export default function Dashboard({ onLogout }) {
  const token = localStorage.getItem("admin_token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const createUser = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("User created successfully");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("Failed to create user");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      {/* 🔴 LOGOUT BUTTON */}
      <button
        onClick={onLogout}
        style={{
          float: "right",
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <h2>Admin Dashboard</h2>

      <h3>Create User</h3>

      <input
        placeholder="User email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="User password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={createUser}>Create User</button>

      {message && <p>{message}</p>}
    </div>
  );
}
