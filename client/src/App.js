import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js"; // Ensure you create a Login component
import Home from "./components/Home.js";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
