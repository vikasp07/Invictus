import React from "react";

const SOS = () => {
  const handleSOS = () => {
    alert("SOS Alert Sent! Emergency contacts have been notified.");
  };

  return (
    <div className="container animate-fade-in">
      <h2>Emergency Assistance</h2>
      <p>If you are in danger, press the button below to send an SOS alert.</p>
      <button className="btn sos-btn" onClick={handleSOS}>
        SOS
      </button>
    </div>
  );
};

export default SOS;
