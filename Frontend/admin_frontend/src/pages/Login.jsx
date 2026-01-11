import { useState } from "react";
import api from "../services/api";

export default function AdminDashboard({ onLogout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const createUser = async () => {
    try {
      await api.post("/users", { email, password });
      setMessage("User created successfully");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("Failed to create user");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={onLogout} style={{ float: "right", background: "red", color: "white" }}>
        Logout
      </button>

      <h2>Admin Dashboard</h2>

      <h3>Create User</h3>

      <input
        placeholder="User email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="User password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={createUser}>Create User</button>

      {message && <p>{message}</p>}
    </div>
  );
}
