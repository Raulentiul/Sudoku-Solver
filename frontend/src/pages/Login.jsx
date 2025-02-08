import "../Styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button/button";
import Input from "../Components/Input/input";
import "../Components/Input/input.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Depending on how your backend sends the response:
      // If it returns JSON on success/failure, use response.json()
      // If it returns plain text, keep using response.text().
      // Below, let's assume it returns JSON on success.
      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log("Login successful!");
        
        // 1. Store the user email in localStorage
        localStorage.setItem("userEmail", email);
        
        // 2. Navigate to profile
        navigate("/profile");
      } else {
        // If not 2xx status, data might contain an error message
        setError(data.message || "Login failed");
      }
    } catch (err) {
      // Catch any network/JSON parsing errors
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1>Sudoku Play & Solver</h1>
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
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

          {/* Display error if any */}
          {error && <p className="error-message">{error}</p>}

          <Button type="submit">Sign in</Button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <span className="register-now" onClick={handleRegisterClick}>
                Register now
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
