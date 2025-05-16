import React from 'react';
import API from '../api';
import '../styles/Logoutbutton.css'


const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await API.post('/logout'); 
      window.location.href = "/login"; // redirect after logout
    } catch (error) {
      console.error("Logout failed", error);
      console.log("Cookies at time of logout:", document.cookie);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className='logout-btn'>
        Logout
      </button> 
    </div>
  );
};

export default LogoutButton;
