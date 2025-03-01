import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RideList from "./components/RideList";
import CreateRide from "./components/CreateRide";
import Register from "./components/Register";
import Login from "./components/Login";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h2>RideShare</h2>
          <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create Ride</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RideList />} />
          <Route path="/create" element={<CreateRide />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
