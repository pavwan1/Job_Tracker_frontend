import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/Profilepage.css";
import Navbar from "./NavBar";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    skills: "",
  });

  useEffect(() => {
    // Get profile info (replace with your real API route)
    const fetchProfile = async () => {
      try {
        const response = await API.get("/profile");
        const data = response.data;
        setProfile({
          username: data.username,
          email: data.email,
          skills: data.skills || ""
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/profile", { skills: profile.skills }); // only skills update
      alert("Profile updated!");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  
  return (
    <div>
      <Navbar/>
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <label>
        Username
        <input type="text" name="username" value={profile.username} disabled />
      </label>
      <label>
        Email
        <input type="email" name="email" value={profile.email} disabled />
      </label>
      <label>
        Skills
        <input
          type="text"
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="e.g. React, Flask, SQL"
        />
      </label>
      <button type="submit">Update</button>
    </form>
    </div>
  );
};

export default ProfilePage;
