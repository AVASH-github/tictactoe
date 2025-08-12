import React from "react";

export default function Square({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid black",
        height: 100,
        width: 100,
        textAlign: "center",
        lineHeight: "100px",
        fontSize: 24,
        cursor: value ? "not-allowed" : "pointer",
        backgroundColor: value ? "#f1f1f1" : "white",
      }}
    >
      {value}
    </div>
  );
}
