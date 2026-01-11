import { useState } from "react";
import axios from "axios";

export default function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setLocalRole] = useState("developer");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint =
      role === "admin"
        ? "http://localhost:3000/api/admin/login"
        : "http://localhost:3000/api/developer/login";

    try {
      const res = await axios.post(endpoint, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      setToken(res.data.token);
      setRole(role);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <select
          value={role}
          onChange={(e) => setLocalRole(e.target.value)}
        >
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
