import React, { useState } from "react";
import useSocket from "./hooks/useSocket";
import Board from "./components/Board";
import Status from "./components/Status";

function App() {
  const [roomId] = useState("room1"); // Hardcoded room
  const { board, turn, myTurn, winner, makeMove } = useSocket(roomId);

  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white p-6 font-orbitron">
      <h1 className="text-5xl font-extrabold mb-8 text-indigo-400 drop-shadow-neon">
        Tic Tac Toe
      </h1>
      <Board board={board} makeMove={makeMove} />
      {/* status, reset button, etc */}
    <Status turn={turn} myTurn={myTurn} winner={winner} />
    </div>
  );
}

export default App;
