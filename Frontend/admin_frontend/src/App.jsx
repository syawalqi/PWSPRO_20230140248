import { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import ApiDocs from "./pages/ApiDocs";
import DeveloperApiPlayground from "./pages/DeveloperApiPlayground";


export default function App() {
  const [developerView, setDeveloperView] = useState("dashboard");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);



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
  if (developerView === "docs") {
    return <ApiDocs onBack={() => setDeveloperView("dashboard")} />;
  }

  if (developerView === "playground") {
    return (
      <DeveloperApiPlayground
        apiKey={localStorage.getItem("apiKey")}
        onBack={() => setDeveloperView("dashboard")}
      />
    );
  }

  // default dashboard
  return (
    <DeveloperDashboard
      onLogout={logout}
      onDocs={() => setDeveloperView("docs")}
      onPlayground={() => setDeveloperView("playground")}
    />
  );
}


  return <Login setToken={handleLogin} />;
}
