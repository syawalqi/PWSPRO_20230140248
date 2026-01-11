import { useState } from "react";

export default function ApiDocs({ onBack }) {
  const [active, setActive] = useState("intro");

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>API Docs</h3>

        <NavItem label="Introduction" id="intro" active={active} setActive={setActive} />
        <NavItem label="Authentication" id="auth" active={active} setActive={setActive} />
        <NavItem label="Dogs API" id="dogs" active={active} setActive={setActive} />
        <NavItem label="Cats API" id="cats" active={active} setActive={setActive} />
        <NavItem label="Errors" id="errors" active={active} setActive={setActive} />

        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </aside>

      {/* Content */}
      <main style={styles.content}>
        {active === "intro" && <Intro />}
        {active === "auth" && <Auth />}
        {active === "dogs" && <Dogs />}
        {active === "cats" && <Cats />}
        {active === "errors" && <Errors />}
      </main>
    </div>
  );
}

function NavItem({ label, id, active, setActive }) {
  return (
    <div
      onClick={() => setActive(id)}
      style={{
        ...styles.navItem,
        background: active === id ? "#2c3e50" : "transparent",
        color: active === id ? "#fff" : "#333",
      }}
    >
      {label}
    </div>
  );
}

/* ===== CONTENT SECTIONS ===== */

function Intro() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        This Open API provides animal breed data for veterinary and educational
        purposes. All endpoints require an API key.
      </p>
      <p>
        Base URL:
        <code style={styles.inlineCode}>
          http://localhost:3000/api
        </code>
      </p>
    </>
  );
}

function Auth() {
  return (
    <>
      <h2>Authentication</h2>
      <p>
        All requests must include your API key in the request header.
      </p>

      <pre style={styles.codeBlock}>
{`x-api-key: YOUR_API_KEY`}
      </pre>

      <p>
        You can generate or regenerate your API key from the Developer Dashboard.
      </p>
    </>
  );
}

function Dogs() {
  return (
    <>
      <h2>GET /animals/dogs</h2>
      <p>Retrieve a list of dog breeds.</p>

      <h4>Query Parameters</h4>
      <ul>
        <li><b>size</b> — small | medium | large</li>
        <li><b>lifespan_min</b> — minimum lifespan (years)</li>
      </ul>

      <h4>Example Request</h4>
      <pre style={styles.codeBlock}>
{`GET /api/animals/dogs?size=small
x-api-key: YOUR_API_KEY`}
      </pre>

      <h4>Example Response</h4>
      <pre style={styles.codeBlock}>
{`{
  "count": 1,
  "data": [
    {
      "breed_name": "Shih Tzu",
      "size_category": "small",
      "lifespan": 14,
      "image": "https://..."
    }
  ]
}`}
      </pre>
    </>
  );
}

function Cats() {
  return (
    <>
      <h2>GET /animals/cats</h2>
      <p>Retrieve a list of cat breeds.</p>

      <h4>Example Request</h4>
      <pre style={styles.codeBlock}>
{`GET /api/animals/cats
x-api-key: YOUR_API_KEY`}
      </pre>
    </>
  );
}

function Errors() {
  return (
    <>
      <h2>Error Responses</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>401</td>
            <td>Missing API key</td>
          </tr>
          <tr>
            <td>403</td>
            <td>Invalid API key</td>
          </tr>
          <tr>
            <td>500</td>
            <td>Internal server error</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

/* ===== STYLES ===== */

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: 260,
    background: "#ecf0f1",
    padding: 20,
    borderRight: "1px solid #ddd",
  },
  sidebarTitle: {
    marginBottom: 20,
  },
  navItem: {
    padding: "10px 12px",
    cursor: "pointer",
    borderRadius: 4,
    marginBottom: 5,
  },
  backButton: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    border: "none",
    background: "#bdc3c7",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: 40,
    overflowY: "auto",
  },
  codeBlock: {
    background: "#f4f4f4",
    padding: 15,
    borderRadius: 4,
    overflowX: "auto",
  },
  inlineCode: {
    marginLeft: 6,
    padding: "2px 6px",
    background: "#eee",
    borderRadius: 4,
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
};
