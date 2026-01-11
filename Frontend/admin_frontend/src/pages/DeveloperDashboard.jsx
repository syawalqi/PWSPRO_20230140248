import { useEffect, useState } from "react";
import api from "../services/api";

export default function DeveloperDashboard({ onLogout }) {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApiKey = async () => {
    try {
      const res = await api.get("/developer/apikey");
      setApiKey(res.data.apiKey);
    } finally {
      setLoading(false);
    }
  };

  const generateKey = async () => {
    const res = await api.post("/developer/apikey");
    setApiKey(res.data.apiKey);
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <button onClick={onLogout} style={{ float: "right", background: "red", color: "white" }}>
        Logout
      </button>

      <h2>Developer Dashboard</h2>

      <h3>Your API Key</h3>

      {apiKey ? (
        <>
          <code style={{ display: "block", marginBottom: 10 }}>{apiKey}</code>
          <button onClick={generateKey}>Regenerate API Key</button>
        </>
      ) : (
        <button onClick={generateKey}>Generate API Key</button>
      )}
    </div>
  );
}
