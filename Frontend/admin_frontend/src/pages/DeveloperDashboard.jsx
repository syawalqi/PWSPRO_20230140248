export default function DeveloperDashboard({ onLogout }) {
  return (
    <div>
      <h2>Developer Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
