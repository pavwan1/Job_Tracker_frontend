import React, { useState } from "react";
import API from "../api";
import "../styles/Forgotpassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/forgot-password", {
        email,
        answer,
        new_password: newPassword,
      });

      setMessage(res.data.message);
      setEmail("");
      setAnswer("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleReset}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="eg:user@gmail.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Which city were you born in?</label>
          <input 
            type="text" 
            placeholder="eg: Texas"
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>New Password</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p className="link">You can <Link className="linkL" to="/login">Click here</Link>  for login</p>
    </div>
  );
};

export default ForgotPassword;
