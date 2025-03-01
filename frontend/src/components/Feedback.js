import React, { useState } from "react";
import { submitFeedback } from "../services/api";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback({ user: user._id, message, rating });
      alert("Feedback submitted. Thank you!");
      setMessage("");
      setRating(5);
    } catch (err) {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="form-container animate-fade-in">
      <h2>Feedback & Support</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-textarea"
          placeholder="Your feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <br />
        <label>Rating: </label>
        <select
          className="form-input"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
        </select>
        <br />
        <button className="btn" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
