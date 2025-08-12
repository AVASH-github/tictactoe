import React, { useState } from "react";
import useSocket from "./hooks/useSocket";
import Board from "./components/Board";
import Status from "./components/Status";

function App() {
  const [roomId] = useState("room1"); // Hardcoded room
  const { board, turn, myTurn, makeMove } = useSocket(roomId);

  return (
    <div>
      <h1>Tic Tac Toe - Room: {roomId}</h1>
      <Status turn={turn} myTurn={myTurn} />
      <Board board={board} makeMove={makeMove} />
    </div>
  );
}

export default App;
