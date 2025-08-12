
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app); 

const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins
   
  },
});

io.on('connection', (socket)=>{
    console.log("New Client Connected", socket.id);

    //Join a game room 

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log('${socket.id} joined room ${roomId}`);');
    });

    //Handle moves

    socket.on('make-move', (roomId, board, turn ) => {
        socket.to(roomId).emit('update-board', {board, turn });
});
    //Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});

