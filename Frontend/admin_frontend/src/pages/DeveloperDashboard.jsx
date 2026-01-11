import { useEffect, useState } from "react";
import api from "../services/api";

export default function DeveloperDashboard({ onLogout, onDocs, onPlayground }) {

  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

    const fetchApiKey = async () => {
    try {
      const res = await api.get("/developer/apikey");
      setApiKey(res.data.apiKey);

      if (res.data.apiKey) {
        localStorage.setItem("apiKey", res.data.apiKey);
      }
    } finally {
      setLoading(false);
    }
  };


    const generateKey = async () => {
    const res = await api.post("/developer/apikey");
    setApiKey(res.data.apiKey);
    localStorage.setItem("apiKey", res.data.apiKey);
  };


  useEffect(() => {
    fetchApiKey();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Developer Dashboard</h2>
        <button onClick={onLogout} style={styles.logout}>Logout</button>
      </header>

      <section style={styles.card}>
        <h3>Your API Key</h3>

        {apiKey ? (
          <>
            <code style={styles.code}>{apiKey}</code>
            <button style={styles.secondaryButton} onClick={generateKey}>
              Regenerate API Key
            </button>
          </>
        ) : (
          <button style={styles.primaryButton} onClick={generateKey}>
            Generate API Key
          </button>
        )}
      </section>

      <button onClick={onDocs}>View API Documentation</button>
      <button onClick={onPlayground}>Open API Playground</button>

      <section style={styles.card}>
        <h3>Example Request</h3>
        <pre style={styles.pre}>
{`GET http://localhost:3000/api/animals/dogs
Headers:
x-api-key: YOUR_API_KEY`}
        </pre>
      </section>
    </div>
  );
}




const styles = {
  container: {
    maxWidth: 700,
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
    marginBottom: 20,
  },
  code: {
    display: "block",
    background: "#f4f4f4",
    padding: 10,
    marginBottom: 10,
    wordBreak: "break-all",
  },
  pre: {
    background: "#f4f4f4",
    padding: 10,
    overflowX: "auto",
  },
  primaryButton: {
    padding: 10,
    background: "#2c3e50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: 10,
    background: "#555",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
