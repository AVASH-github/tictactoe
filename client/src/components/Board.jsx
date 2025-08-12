import React from "react";
import Square from "./Square";

export default function Board({ board, makeMove }) {
  return (
<div className="grid grid-cols-3 gap-9 max-w-sm mx-auto p-9 bg-gray-900 rounded-xl shadow-neon">
      {board.map((cell, i) => (
        <Square key={i} value={cell} onClick={() => makeMove(i)} />
      ))}
    </div>
  );
}
