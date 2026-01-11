import { useEffect, useState } from "react";
import axios from "axios";

export default function DeveloperDashboard({ onLogout }) {
  const token = localStorage.getItem("dev_token");
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchApiKey = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/developer/apikey",
      { headers }
    );
    setApiKey(res.data.apiKey);
    setLoading(false);
  };

  const generateKey = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/developer/apikey",
      {},
      { headers }
    );
    setApiKey(res.data.apiKey);
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

      <p style={{ marginTop: 20 }}>
        Use this API key in request header:
        <br />
        <code>x-api-key: YOUR_API_KEY</code>
      </p>
    </div>
  );
}
