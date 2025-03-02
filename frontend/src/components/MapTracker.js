import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { getCurrentRide } from "../services/api";
import "./MapTracker.css";

const MapTracker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const socketRef = useRef(null);
  const [ride, setRide] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 19.076, lng: 72.8777 },
      zoom: 12,
    });
    // Use AdvancedMarkerElement if available, else fallback to Marker.
    if (
      window.google.maps.marker &&
      window.google.maps.marker.AdvancedMarkerElement
    ) {
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 19.076, lng: 72.8777 },
        title: "Ride Location",
      });
    } else {
      markerRef.current = new window.google.maps.Marker({
        position: { lat: 19.076, lng: 72.8777 },
        map,
        title: "Ride Location",
      });
    }
  };

  useEffect(() => {
    // Fetch current ride details.
    if (user) {
      getCurrentRide(user._id)
        .then((res) => setRide(res.data))
        .catch((err) => console.log("No current ride"));
    }

    // Load the Google Maps API if it hasn’t been loaded.
    if (!window.google) {
      if (
        !document.querySelector(
          'script[src^="https://maps.googleapis.com/maps/api/js"]'
        )
      ) {
        const script = document.createElement("script");
        // IMPORTANT: Replace YOUR_VALID_GOOGLE_MAPS_API_KEY with your actual API key.
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_VALID_GOOGLE_MAPS_API_KEY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    } else {
      initMap();
    }

    // Connect to Socket.io for real-time location updates.
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("locationUpdate", (data) => {
      const { lat, lng } = data;
      if (markerRef.current) {
        markerRef.current.setPosition(new window.google.maps.LatLng(lat, lng));
      }
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [user]);

  return (
    <div className="map-tracker-container">
      <h2>Real-Time Ride Tracking</h2>
      <div ref={mapRef} className="map-container"></div>
      {ride && (
        <div className="ride-details">
          <h3>Current Ride Details</h3>
          <p>
            <strong>From:</strong> {ride.pickup}
          </p>
          <p>
            <strong>To:</strong> {ride.destination}
          </p>
          <p>
            <strong>Scheduled Time:</strong>{" "}
            {new Date(ride.scheduledTime).toLocaleString()}
          </p>
          {ride.status === "confirmed" && (
            <>
              <p>
                <strong>Estimated Time:</strong> {ride.estimatedTime} mins
              </p>
              <p>
                <strong>Price per person:</strong> ₹
                {(
                  ride.fare /
                  (1 + (ride.passengers ? ride.passengers.length : 0))
                ).toFixed(2)}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MapTracker;
