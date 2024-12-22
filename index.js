const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log('A user connected:', socket.id);

    socket.on("send", (message) => {
        console.log(`Message received: ${message}`);
        io.emit("receive", message); // Broadcast to all connected clients
    });

    socket.on("disconnect", () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Serve static files from the "public" folder
app.use(express.static(path.resolve(__dirname, "public")));

// Start the server
server.listen(9000, () => {
    console.log('Server started at PORT: 9000');
});
