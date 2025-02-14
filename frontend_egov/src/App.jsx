import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Register from "./components/Register";
import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";

function App() {
  const { authenticatedUser, setAuthenticatedUser } = useAppContext();

  // Sync the state with localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("authenticatedUser");
    setAuthenticatedUser({
      username: localStorage.getItem("authenticatedUser"),
      name: localStorage.getItem("name"),
      id: localStorage.getItem("authenticatedUserId"),
      role: storedUser,
    });
  }, []); // Empty dependency array ensures this runs only once on initial load
  
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center gap-4 box-border">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard/*"
          element={
            localStorage.getItem("authenticatedUser") === "admin" ||
            authenticatedUser.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-dashboard/*"
          element={
            localStorage.getItem("authenticatedUser") === "customer" ||
            authenticatedUser.role === "customer" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
