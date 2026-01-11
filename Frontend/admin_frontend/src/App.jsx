import { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);

  // 🔐 Restore session ONCE
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (
      savedToken &&
      (savedRole === "admin" || savedRole === "developer")
    ) {
      setToken(savedToken);
      setRole(savedRole);
    }

    setReady(true);
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  // ⛔ Block render until hydration finishes
  if (!ready) {
    return <p>Loading...</p>;
  }

  if (!token) {
    return <Login setToken={handleLogin} />;
  }

  if (role === "admin") {
    return <AdminDashboard onLogout={logout} />;
  }

  if (role === "developer") {
    return <DeveloperDashboard onLogout={logout} />;
  }

  return <Login setToken={handleLogin} />;
}
