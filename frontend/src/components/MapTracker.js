import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const MapTracker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize Google Map with Mumbai center
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.076, lng: 72.8777 },
        zoom: 12,
      });
      markerRef.current = new window.google.maps.Marker({
        position: { lat: 19.076, lng: 72.8777 },
        map,
        title: "Ride Location",
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    // Connect to Socket.io for location updates
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
  }, []);

  return (
    <div className="container animate-slide-up">
      <h2>Real-Time Ride Tracking</h2>
      <div ref={mapRef} className="map-container"></div>
    </div>
  );
};

export default MapTracker;
