import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-s-1.onrender.com"],
  },
});

function getReceiversSocketsId(userId) {
  return useSocketMap.get(String(userId));
}

const useSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    useSocketMap.set(userId, socket.id);
    io.emit("getOnlineUsers", [...useSocketMap.keys()]);
  }

  socket.on("disconnect", () => {
    if (useSocketMap.get(userId) === socket.id) {
      useSocketMap.delete(userId);
      console.log("Bro just rage quit", socket.id);
      io.emit("getOnlineUsers", [...useSocketMap.keys()]);
    }
  });
});

export { io, app, server, getReceiversSocketsId };
