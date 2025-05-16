import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Import useNavigate
import API from "../api"; // Assuming you have an API setup for requests
import "../styles/Login.css"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful") {
        onLogin(response.data.user); // Handle successful login 
        console.log("Login success:", response.data);
        navigate("/dashboard");  
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <p className="head">Welcome to Job-tracker, please login to explore 😊...</p>
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="link">
        <p>Don't have an account? <Link className="linkL" to="/register">Register here</Link></p>
        <a href="/forgot-password" class="forgot-link">Forgot Password ?</a>

      </div>
    </div>
    </div>
    
  );
};

export default Login;
