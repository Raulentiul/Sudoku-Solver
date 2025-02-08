import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/navbar";
import "../Styles/Profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  // Retrieve the email from localStorage (or from your state management)
  const storedEmail = localStorage.getItem("userEmail");

  // 1. Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Make sure we have an email stored
        if (!storedEmail) return;

        const response = await fetch(
          `http://localhost:5000/users/profile/${storedEmail}`
        );
        if (response.ok) {
          const data = await response.json();
          // Populate local states with user data
          setName(data.username);
          setEmail(data.email);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [storedEmail]);

  // Handlers for local state
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 2. Update the user profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!storedEmail) {
      console.error("No stored email found for the user");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/profile/${storedEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            newEmail: email,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully");
        // Optionally refresh the page or re-fetch to update the displayed info
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Photo preview handling (client-side only in this example)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-box">
          {/* Profile image */}
          <div className="profile-image">
            {photo ? (
              <img src={photo} alt="Profile" />
            ) : (
              <img src="https://via.placeholder.com/250" alt="Profile" />
            )}
          </div>

          {/* Photo upload button */}
          <div className="photo-upload">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>

          {/* Profile information */}
          <div className="profile-info">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />

            <label htmlFor="password">Change Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {/* Update button */}
          <button className="update-button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
