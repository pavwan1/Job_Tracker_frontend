import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import API from "../api";  
import "../styles/Register.css"

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/register", {
        username,
        email,
        password,
        security_answer: securityAnswer,
      });

      if (response.status === 201) {
        setSuccessMessage("Registration successful! You can now log in.");
        setErrorMessage(""); 
        setEmail("");  
        setPassword("");
        setSecurityAnswer("")

      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
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
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <label>Which city were you born in?</label>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="link">
        <p>Already have an account? <Link className="linkL" to="/login">Click here</Link>  for login</p>
      </div>
    </div>
  );
};

export default Register;
