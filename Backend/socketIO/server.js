import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Update CORS to allow connections from Vercel frontend
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",  // Environment variable for frontend URL
    methods: ["GET", "POST"],
  },
});

const users = {};

// Function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// Listening for connection events
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    users[userId] = socket.id;
    console.log("Users:", users);
  }

  // Emit online users
  io.emit("getOnlineUsers", Object.keys(users));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
