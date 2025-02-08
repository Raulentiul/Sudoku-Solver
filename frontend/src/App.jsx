import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Solve from "./pages/Solve";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/solve" element={<Solve />} />
      </Routes>
    </Router>
  );
};

export default App;
