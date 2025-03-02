import React, { useEffect, useState } from "react";
import { getAvailableRides, confirmRide } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";

const ADMIN_ID = "ADMIN123"; // Replace with the actual admin user's id if needed

const OwnerDashboard = () => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  const owner = JSON.parse(localStorage.getItem("user"));

  // Restrict access: Only allow if user role is 'owner'
  if (!owner || owner.role !== "owner") {
    navigate("/");
    return null;
  }

  useEffect(() => {
    getAvailableRides().then((res) => setRides(res.data));
  }, []);

  const handleConfirm = (rideId) => {
    const estimatedTime = prompt("Enter estimated time (in minutes):");
    const finalFare = prompt("Enter final fare (in INR):");
    if (estimatedTime && finalFare) {
      confirmRide(rideId, {
        ownerId: owner._id,
        estimatedTime: parseInt(estimatedTime),
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
            <strong>Fare (Estimated):</strong> ₹{ride.fare}
          </p>
          <p>
            <strong>Scheduled Time:</strong>{" "}
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
              <p>Final Fare: ₹{ride.finalFare}</p>
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
