import "../Styles/Register.css";
import React, { useState } from "react";
import Button from "../Components/Button/button";
import Input from "../Components/Input/input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Adding username state
  const [error, setError] = useState(""); // To handle error messages
  const [success, setSuccess] = useState(""); // To handle success messages

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Send registration data to backend
    const response = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }), // Pass username, email, and password
    });

    const data = await response.text(); // Parse the response text (error or success message)

    if (response.ok) {
      setSuccess("Registration successful!"); // Show success message
      setError(""); // Clear error message
    } else {
      setError(data); // Show error message
      setSuccess(""); // Clear success message
    }
  };

  return (
    <div className="register-container">
      <h1>Sudoku Play & Solver</h1>
      <div className="register-box">
        <form onSubmit={handleRegister} className="register-form">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Enter your personal email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} {/* Display error */}
          {success && <p className="success-message">{success}</p>} {/* Display success */}
          <Button type="submit">Register</Button>
          <div className="login-link">
            <p>
              Already have an account?{" "}
              <span
                className="login-now"
                onClick={() => (window.location.href = "/login")}
              >
                Log in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
