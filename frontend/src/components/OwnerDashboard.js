import React, { useEffect, useState } from "react";
import { getAvailableRides, confirmRide } from "../services/api";
import { useNavigate, Navigate } from "react-router-dom";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  const owner = JSON.parse(localStorage.getItem("user"));

  // Always call hooks unconditionally.
  useEffect(() => {
    if (owner && owner.role === "owner") {
      getAvailableRides().then((res) => setRides(res.data));
    }
  }, [owner]);

  // After hooks, conditionally render redirect if user is not an owner.
  if (!owner || owner.role !== "owner") {
    return <Navigate to="/" />;
  }

  const handleConfirm = (rideId) => {
    const estimatedTime = prompt("Enter estimated time (in minutes):");
    const finalFare = prompt("Enter total fare (in INR):");
    if (estimatedTime && finalFare) {
      confirmRide(rideId, {
        ownerId: owner._id,
        estimatedTime: parseInt(estimatedTime, 10),
        finalFare: parseFloat(finalFare),
      })
        .then(() => {
          alert("Ride confirmed successfully!");
          getAvailableRides().then((res) => setRides(res.data));
        })
        .catch((err) => alert("Error confirming ride"));
    }
  };

  return (
    <div className="owner-dashboard-container">
      <h2>Owner Dashboard</h2>
      <p>Pending ride requests:</p>
      {rides.length === 0 && <p>No pending rides available.</p>}
      {rides.map((ride) => (
        <div key={ride._id} className="ride-card">
          <p>
            <strong>From:</strong> {ride.pickup}
          </p>
          <p>
            <strong>To:</strong> {ride.destination}
          </p>
          <p>
            <strong>Ride Time:</strong>{" "}
            {ride.scheduledTime
              ? new Date(ride.scheduledTime).toLocaleString()
              : "ASAP"}
          </p>
          {ride.status === "pending" && (
            <button className="btn" onClick={() => handleConfirm(ride._id)}>
              Confirm Ride
            </button>
          )}
          {ride.status === "confirmed" && (
            <div className="confirmed-info">
              <p>
                <strong>Ride Confirmed!</strong>
              </p>
              <p>Estimated Time: {ride.estimatedTime} mins</p>
              <p>Total Fare: ₹{ride.fare}</p>
            </div>
          )}
        </div>
      ))}
      <button className="btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default OwnerDashboard;
