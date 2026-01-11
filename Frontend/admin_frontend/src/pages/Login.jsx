import { useState } from "react";
import api from "../services/api";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint =
      role === "admin"
        ? "http://localhost:3000/api/admin/login"
        : "http://localhost:3000/api/developer/login";

    try {
      const res = await api.post(
        role === "admin" ? "/admin/login" : "/developer/login",
        { email, password }
      );

      // 🔑 Pass BOTH token + role
      setToken(res.data.token, role);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
