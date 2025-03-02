import React, { useState } from "react";
import { createRide } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./CreateRide.css";

const mumbaiAreas = [
  "Andheri",
  "Bandra",
  "Colaba",
  "Dadar",
  "Goregaon",
  "Mulund",
  "Powai",
  "Chembur",
  "Vikhroli",
];

const CreateRide = () => {
  const [pickup, setPickup] = useState(mumbaiAreas[0]);
  const [destination, setDestination] = useState(mumbaiAreas[1]);
  const [scheduledTime, setScheduledTime] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRide({
        driver: user._id,
        pickup,
        destination,
        scheduledTime,
      });
      alert("Ride requested successfully!");
      navigate("/rides");
    } catch (err) {
      alert("Error creating ride");
    }
  };

  return (
    <div className="create-ride-container">
      <h2>Request Ride</h2>
      <form className="create-ride-form" onSubmit={handleSubmit}>
        <label>Pickup Location:</label>
        <select
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        >
          {mumbaiAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <label>Destination:</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        >
          {mumbaiAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <label>Ride Time:</label>
        <input
          type="datetime-local"
          className="ride-input"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Request Ride
        </button>
      </form>
    </div>
  );
};

export default CreateRide;
