import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard({ onLogout }) {
  const [developers, setDevelopers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loadDevelopers = async () => {
    const res = await api.get("/admin/developers");
    setDevelopers(res.data);
  };

  const createDeveloper = async () => {
    try {
      await api.post("/users", { email, password });
      setEmail("");
      setPassword("");
      setMessage("✅ Developer created");
      loadDevelopers();
    } catch {
      setMessage("❌ Failed to create developer");
    }
  };

  const deleteDeveloper = async (id) => {
    if (!confirm("Delete this developer?")) return;
    await api.delete(`/admin/developers/${id}`);
    loadDevelopers();
  };

  const regenerateApiKey = async (id) => {
    await api.post(`/admin/apikey/${id}/regenerate`);
    alert("API key regenerated");
  };

  const revokeApiKey = async (id) => {
    await api.delete(`/admin/apikey/${id}`);
    alert("API key revoked");
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button onClick={onLogout} style={styles.logout}>Logout</button>
      </header>

      {/* CREATE DEV */}
      <section style={styles.card}>
        <h3>Create Developer</h3>

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

        <button style={styles.primaryButton} onClick={createDeveloper}>
          Create Developer
        </button>

        {message && <p>{message}</p>}
      </section>

      {/* LIST DEV */}
      <section style={styles.card}>
        <h3>Developer List</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>API Key</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {developers.map((dev) => (
              <tr key={dev.id}>
                <td>{dev.email}</td>
                <td>
                  <code>{dev.apiKey || "—"}</code>
                </td>
                <td>
                  <button onClick={() => regenerateApiKey(dev.id)}>
                    Regenerate Key
                  </button>
                  <button onClick={() => revokeApiKey(dev.id)}>
                    Revoke Key
                  </button>
                  <button
                    onClick={() => deleteDeveloper(dev.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

/* ===== STYLES ===== */

const styles = {
  container: {
    maxWidth: 900,
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  logout: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
  },
  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 6,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  primaryButton: {
    padding: 10,
    background: "#2c3e50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
