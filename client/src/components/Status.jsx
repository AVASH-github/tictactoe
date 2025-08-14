import React from "react";

export default function Status({ turn, myTurn, winner }) {
  // Helper classes for neon glow
  const neonClasses = "drop-shadow-neon animate-pulse";

  // Display winner
  if (winner) {
    if (winner === "Draw") {
      return (
        <div
          className={`mt-6 text-2xl font-extrabold text-yellow-400 ${neonClasses} px-6 py-2 rounded-lg border-2 border-yellow-400`}
        >
          It's a Draw! 🤝
        </div>
      );
    }
    return (
      <div
        className={`mt-6 text-2xl font-extrabold text-green-400 ${neonClasses} px-6 py-2 rounded-lg border-2 border-green-400`}
      >
        Player {winner} Wins! 🎉
      </div>
    );
  }

  // Display current turn
  return (
    <div className="mt-6">
      <span
        className={`inline-block px-4 py-2 rounded-lg font-bold ${
          myTurn
            ? "bg-indigo-600 text-white animate-pulse shadow-neon border-2 border-indigo-400"
            : "bg-gray-700 text-gray-400"
        }`}
      >
        {myTurn ? `Your Turn (${turn})` : `Waiting for Opponent (${turn})`}
      </span>
    </div>
  );
}
