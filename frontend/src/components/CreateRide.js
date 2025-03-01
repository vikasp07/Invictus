import React, { useState } from "react";
import { createRide } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRide({ driver: user._id, pickup, destination, fare });
    alert("Ride created successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Create Ride</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Fare"
          value={fare}
          onChange={(e) => setFare(e.target.value)}
          required
        />
        <button type="submit">Create Ride</button>
      </form>
    </div>
  );
};

export default CreateRide;
