const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log("Server Started");
});

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  io.emit("message", "New User Joined");

  socket.on("sendMessage", (message, callback) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    // const user = removeUser(socket.id);
    console.log("user Left");
    io.emit("message", "User has Left");
  });
});
