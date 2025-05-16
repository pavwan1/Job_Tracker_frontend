import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/Dashboard";
import Register from "./components/Register";
import LogoutButton from "./components/LogoutButton";
import ProfilePage from "./components/ProfilePage";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [user, setUser] = useState(null); // To track the logged-in user

  const handleLogin = (userData) => {
    setUser(userData); 
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={user ? <DashBoard /> : <Login onLogin={handleLogin} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/logout' element={ <LogoutButton /> } />
          <Route path="/forgot-password" element= { <ForgotPassword /> } />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
