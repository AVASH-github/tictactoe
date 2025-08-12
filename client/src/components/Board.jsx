import React from "react";
import Square from "./Square";

export default function Board({ board, makeMove }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
      {board.map((cell, i) => (
        <Square key={i} value={cell} onClick={() => makeMove(i)} />
      ))}
    </div>
  );
}
