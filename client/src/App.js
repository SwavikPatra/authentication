import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js"; //
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/checkAuth",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      // Redirect to home or login page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/auth/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
