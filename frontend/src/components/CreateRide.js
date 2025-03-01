import React, { useState } from "react";
import { createRide } from "../services/api";
import { useNavigate } from "react-router-dom";

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
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
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
        distance: parseFloat(distance),
        duration: parseFloat(duration),
        scheduledTime,
      });
      alert("Ride created successfully!");
      navigate("/rides");
    } catch (err) {
      alert("Error creating ride");
    }
  };

  return (
    <div className="form-container animate-slide-up">
      <h2>Create Ride</h2>
      <form onSubmit={handleSubmit}>
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
        <input
          type="number"
          className="form-input"
          placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-input"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          className="form-input"
          placeholder="Scheduled Time (optional)"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
        />
        <button className="btn" type="submit">
          Create Ride
        </button>
      </form>
    </div>
  );
};

export default CreateRide;
