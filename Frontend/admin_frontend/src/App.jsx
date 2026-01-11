import { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";


function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  if (!token) {
    return <Login setToken={setToken} setRole={setRole} />;
  }

  if (role === "admin") {
    return <AdminDashboard onLogout={logout} />;
  }

  if (role === "developer") {
    return <DeveloperDashboard onLogout={logout} />;
  }

  return <Login setToken={setToken} setRole={setRole} />;
}

export default App;
