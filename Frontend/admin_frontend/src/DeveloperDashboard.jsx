import { useEffect, useState } from "react";
import axios from "axios";

export default function DeveloperDashboard({ onLogout }) {
  const token = localStorage.getItem("token");

  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ DECLARED ONCE
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const fetchApiKey = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/developer/apikey",
        { headers: authHeaders }
      );
      setApiKey(res.data.apiKey);
    } catch (err) {
      console.error("FETCH API KEY ERROR:", err.response?.data || err.message);
      setError("Failed to load API key");
    } finally {
      setLoading(false);
    }
  };

  const generateKey = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/developer/apikey",
        {},
        { headers: authHeaders }
      );
      setApiKey(res.data.apiKey);
    } catch (err) {
      console.error("GENERATE API KEY ERROR:", err.response?.data || err.message);
      setError("Failed to generate API key");
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={onLogout}
        style={{ float: "right", background: "red", color: "white" }}
      >
        Logout
      </button>

      <h2>Developer Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Your API Key</h3>

      {apiKey ? (
        <>
          <code style={{ display: "block", marginBottom: 10 }}>
            {apiKey}
          </code>
          <button onClick={generateKey}>Regenerate API Key</button>
        </>
      ) : (
        <button onClick={generateKey}>Generate API Key</button>
      )}
    </div>
  );
}
