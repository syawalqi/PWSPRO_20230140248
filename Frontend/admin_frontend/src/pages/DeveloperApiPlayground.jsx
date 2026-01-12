import { useState } from "react";

export default function DeveloperApiPlayground({ apiKey, onBack }) {
  const [endpoint] = useState("/exercises");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // pagination state
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const sendRequest = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const offset = (pageNumber - 1) * limit;

      const url =
        `http://localhost:3000/api${endpoint}?limit=${limit}&offset=${offset}` +
        (query ? `&${query}` : "");

      const res = await fetch(url, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      const data = await res.json();
      setResponse(data);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack}>← Back</button>

      <h2>API Playground</h2>
      <p>Test the public API using your API key.</p>

      <label>Endpoint</label>
      <select style={styles.input} value={endpoint} disabled>
        <option value="/exercises">/exercises</option>
      </select>

      <label>Query Parameters</label>
      <input
        style={styles.input}
        placeholder="equipment=dumbbell&muscle=glutes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button style={styles.send} onClick={() => sendRequest(1)}>
        {loading ? "Sending..." : "Send Request"}
      </button>

      {response && (
        <>
          {/* PAGINATION */}
          {response.pagination && (
            <div style={styles.pagination}>
              <button
                onClick={() => sendRequest(page - 1)}
                disabled={page <= 1}
              >
                ◀ Previous
              </button>

              <span>
                Page {page} of {response.pagination.total_pages}
              </span>

              <button
                onClick={() => sendRequest(page + 1)}
                disabled={page >= response.pagination.total_pages}
              >
                Next ▶
              </button>
            </div>
          )}

          <h3>Response</h3>
          <ResponseRenderer response={response} />
        </>
      )}

      {error && (
        <>
          <h3>Error</h3>
          <pre style={styles.error}>{error}</pre>
        </>
      )}
    </div>
  );
}

function ResponseRenderer({ response }) {
  if (response?.data && Array.isArray(response.data)) {
    return (
      <div style={gridStyles.grid}>
        {response.data.map((item, index) => (
          <div key={index} style={gridStyles.card}>
            {item.media?.url && (
              <img
                src={item.media.url}
                alt={item.exercise_name}
                style={gridStyles.image}
              />
            )}

            <h4>{item.exercise_name}</h4>

            <p><b>Equipment:</b> {item.equipment.join(", ")}</p>
            <p><b>Primary muscles:</b> {item.primary_muscles.join(", ")}</p>
            <p><b>Body parts:</b> {item.body_parts.join(", ")}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <pre style={styles.output}>
      {JSON.stringify(response, null, 2)}
    </pre>
  );
}

/* ===== STYLES ===== */

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  },
  send: {
    padding: 10,
    background: "#2c3e50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: 20,
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0",
  },
  output: {
    background: "#f4f4f4",
    padding: 15,
    overflowX: "auto",
  },
  error: {
    background: "#ffe6e6",
    padding: 15,
  },
};

const gridStyles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: 12,
    background: "#fff",
  },
  image: {
    width: "100%",
    height: 140,
    objectFit: "cover",
    borderRadius: 4,
    marginBottom: 10,
  },
};
