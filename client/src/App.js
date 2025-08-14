import React, { useState } from "react";
import useSocket from "./hooks/useSocket";
import Board from "./components/Board";
import Status from "./components/Status";

function App() {
  const [roomId] = useState("room1"); // Hardcoded room
  const {
    board,
    turn,
    myTurn,
    winner,
    makeMove,
    rematchRequest,
    requestRematch,
    acceptRematch,
    rejectRematch,
  } = useSocket(roomId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 font-orbitron">
      <h1 className="mb-8 text-5xl font-extrabold text-indigo-400 drop-shadow-neon">
        Tic Tac Toe
      </h1>

      <Board board={board} makeMove={makeMove} />
      <Status turn={turn} myTurn={myTurn} winner={winner} />

      {/* Show Play Again button if game ended and no rematch request yet */}
      {winner && !rematchRequest && (
        <button
          onClick={requestRematch}
          className="px-6 py-3 mt-6 text-lg font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:shadow-neon"
        >
          Play Again
        </button>
      )}

      {/* Show rematch request received */}
      {rematchRequest && (
        <div className="flex items-center gap-4 mt-6">
          <span className="text-yellow-400">
            Player {rematchRequest} wants to play again
          </span>
          <button
            onClick={acceptRematch}
            className="px-4 py-2 font-bold bg-green-500 rounded-lg"
          >
            Accept
          </button>
          <button
            onClick={rejectRematch}
            className="px-4 py-2 font-bold bg-red-500 rounded-lg"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
