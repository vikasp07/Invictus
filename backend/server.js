const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Import routes
app.use("/auth", require("./routes/auth"));
app.use("/rides", require("./routes/rides"));
app.use("/admin", require("./routes/admin"));
app.use("/feedback", require("./routes/feedback"));

// Socket.io for real-time location tracking
io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("locationUpdate", (data) => {
    // Broadcast location update to all connected clients (or filter by ride ID)
    io.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
