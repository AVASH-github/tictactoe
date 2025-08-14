const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Track players in rooms
const rooms = {}; // { roomId: { X: socketId, O: socketId } }

io.on("connection", (socket) => {
  console.log("New Client Connected", socket.id);

  socket.on("join-room", (roomId) => {
    // Create room if it doesn't exist
    if (!rooms[roomId]) rooms[roomId] = {};

    // Check room occupancy
    const players = Object.keys(rooms[roomId]);
    if (players.length >= 2) {
      socket.emit("room-full");
      return;
    }

    // Assign X or O
    const playerSymbol = players.includes("X") ? "O" : "X";
    rooms[roomId][playerSymbol] = socket.id;

    socket.join(roomId);
    socket.data.symbol = playerSymbol;

    console.log(`Player ${playerSymbol} (${socket.id}) joined room ${roomId}`);

    // Notify player of their symbol
    socket.emit("player-symbol", playerSymbol);
  });

  // Handle moves
  socket.on("make-move", ({ roomId, board, turn }) => {
    socket.to(roomId).emit("update-board", { board, turn });
  });

  // Reset game
  socket.on("reset-game", ({ roomId }) => {
    io.to(roomId).emit("reset-board");
  });

  // Rematch requests
 // Rematch requests
socket.on("rematch-request", ({ roomId, from }) => {
  socket.to(roomId).emit("rematch-request", { from }); // notify other player
});

socket.on("rematch-accepted", ({ roomId }) => {
  io.in(roomId).emit("rematch-accepted"); // notify both players to reset game
});

socket.on("rematch-rejected", ({ roomId }) => {
  socket.to(roomId).emit("rematch-rejected"); // notify the requester
});


  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);

    // Remove player from rooms
    for (const roomId in rooms) {
      const room = rooms[roomId];
      for (const symbol in room) {
        if (room[symbol] === socket.id) {
          delete room[symbol];
          // Notify remaining player
          socket.to(roomId).emit("player-left", { symbol });
        }
      }
      // Clean up empty room
      if (Object.keys(room).length === 0) delete rooms[roomId];
    }
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
