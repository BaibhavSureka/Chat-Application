import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4002",
    methods: ["GET", "POST"],
  },
});

// real time message goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// use to listen events on server side
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("hello", users);
  }

  // used to send the events  to all the connected clients.
  io.emit("getOnlineUsers", Object.keys(users));

  // used to listen events client side event emitted by server side (client & server)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
