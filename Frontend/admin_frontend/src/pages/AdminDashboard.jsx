import { useState } from "react";
import api from "../services/api";

export default function AdminDashboard({ onLogout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    setMessage("");
    setLoading(true);

    try {
      await api.post("/users", { email, password });
      setMessage("✅ Developer account created successfully");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("❌ Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button onClick={onLogout} style={styles.logout}>Logout</button>
      </header>

      <section style={styles.card}>
        <h3>Create Developer Account</h3>

        <input
          style={styles.input}
          placeholder="Developer email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Temporary password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.primaryButton}
          onClick={createUser}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>

        {message && <p>{message}</p>}
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logout: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 6,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  primaryButton: {
    width: "100%",
    padding: 10,
    background: "#2c3e50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
