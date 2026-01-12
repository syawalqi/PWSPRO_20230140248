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
        <NavItem label="Exercises API" id="exercises" active={active} setActive={setActive} />
        <NavItem label="Pagination" id="pagination" active={active} setActive={setActive} />
        <NavItem label="Errors" id="errors" active={active} setActive={setActive} />

        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </aside>

      {/* Content */}
      <main style={styles.content}>
        {active === "intro" && <Intro />}
        {active === "auth" && <Auth />}
        {active === "exercises" && <Exercises />}
        {active === "pagination" && <Pagination />}
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
        This Open API provides structured exercise and gym equipment data.
        All endpoints are protected using an API key.
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

function Exercises() {
  return (
    <>
      <h2>GET /exercises</h2>
      <p>Retrieve a paginated list of exercises.</p>

      <h4>Query Parameters</h4>
      <ul>
        <li><b>limit</b> — number of items per page (default: 10)</li>
        <li><b>offset</b> — number of items to skip</li>
        <li><b>equipment</b> — filter by equipment (e.g. dumbbell)</li>
        <li><b>muscle</b> — filter by primary muscle (e.g. glutes)</li>
        <li><b>body_part</b> — filter by body part (e.g. upper legs)</li>
      </ul>

      <h4>Example Request</h4>
      <pre style={styles.codeBlock}>
{`GET /api/exercises?limit=10&offset=0&equipment=dumbbell
x-api-key: YOUR_API_KEY`}
      </pre>

      <h4>Example Response</h4>
      <pre style={styles.codeBlock}>
{`{
  "count": 10,
  "total": 319,
  "pagination": {
    "limit": 10,
    "offset": 0,
    "current_page": 1,
    "total_pages": 32
  },
  "data": [ ... ]
}`}
      </pre>
    </>
  );
}

function Pagination() {
  return (
    <>
      <h2>Pagination</h2>
      <p>
        Pagination is handled using <b>limit</b> and <b>offset</b>.
      </p>

      <ul>
        <li><b>limit</b> — how many items to return</li>
        <li><b>offset</b> — how many items to skip</li>
      </ul>

      <p>Example:</p>
      <pre style={styles.codeBlock}>
{`Page 1 → limit=10&offset=0
Page 2 → limit=10&offset=10
Page 3 → limit=10&offset=20`}
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
