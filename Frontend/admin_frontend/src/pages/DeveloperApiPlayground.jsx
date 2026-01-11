import { useState } from "react";

export default function DeveloperApiPlayground({ apiKey, onBack }) {
  const [endpoint, setEndpoint] = useState("/animals/dogs");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const url =
        "http://localhost:3000/api" +
        endpoint +
        (query ? `?${query}` : "");

      const res = await fetch(url, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      const data = await res.json();
      setResponse(data);
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
      <select
        style={styles.input}
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
      >
        <option value="/animals/dogs">/animals/dogs</option>
        <option value="/animals/cats">/animals/cats</option>
      </select>

      <label>Query Parameters</label>
      <input
        style={styles.input}
        placeholder="size=small&lifespan_min=10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button style={styles.send} onClick={sendRequest}>
        {loading ? "Sending..." : "Send Request"}
      </button>

      {response && (
        <>
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
//// test gambar
  if (response?.data && Array.isArray(response.data)) {
    return (
      <div style={gridStyles.grid}>
        {response.data.map((item, index) => (
          <div key={index} style={gridStyles.card}>
            {item.image && (
              <img
                src={item.image}
                alt={item.breed_name}
                style={gridStyles.image}
              />
            )}

            <h4>{item.breed_name}</h4>
            <p><b>Species:</b> {item.species}</p>
            <p><b>Size:</b> {item.size_category}</p>

            {item.lifespan && (
              <p>
                <b>Lifespan:</b> {item.lifespan.min}–{item.lifespan.max} yrs
              </p>
            )}

            {item.temperament?.length > 0 && (
              <p style={gridStyles.tags}>
                {item.temperament.map((t, i) => (
                  <span key={i} style={gridStyles.tag}>{t}</span>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

/// test json
  return (
    <pre style={styles.output}>
      {JSON.stringify(response, null, 2)}
    </pre>
  );
}


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
  tags: {
    marginTop: 8,
  },
  tag: {
    display: "inline-block",
    background: "#ecf0f1",
    padding: "2px 6px",
    margin: "2px",
    borderRadius: 4,
    fontSize: 12,
  },
};
