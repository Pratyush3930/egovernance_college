import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// use react hook form and material ui to create this app
function App() {
  const loginDetails = {
    Name: "Admin",
    Password: "admin",
  }
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center gap-4 box-border">
      <Routes>
        <Route path="/login" element={<Login loginDetails={loginDetails}/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
