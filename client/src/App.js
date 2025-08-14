import React, { useState } from "react";
import useSocket from "./hooks/useSocket";
import Board from "./components/Board";
import Status from "./components/Status";

function App() {
  const [roomId] = useState("room1"); // Hardcoded room
  const { board, turn, myTurn, winner, makeMove, resetGame } = useSocket(roomId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 font-orbitron">
      <h1 className="mb-8 text-5xl font-extrabold text-indigo-400 drop-shadow-neon">
        Tic Tac Toe
      </h1>

      <Board board={board} makeMove={makeMove} />
      <Status turn={turn} myTurn={myTurn} winner={winner} />

      {winner && (
        <button
          onClick={resetGame}
          className="px-6 py-3 mt-6 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:shadow-neon"
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;
