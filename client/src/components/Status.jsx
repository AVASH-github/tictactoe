export default function Status({ turn, myTurn, winner }) {
  if (winner) {
    if (winner === "Draw") {
      return (
        <div className="mt-6 text-2xl font-bold text-yellow-400 drop-shadow-neon animate-pulse">
          It's a Draw! 🤝
        </div>
      );
    }
    return (
      <div className="mt-6 text-2xl font-bold text-green-400 drop-shadow-neon">
        Player {winner} Wins! 🎉
      </div>
    );
  }

  return (
    <div className="mt-6">
      <span
        className={`inline-block px-4 py-1 rounded-full font-bold 
        ${
          myTurn
            ? "bg-indigo-600 animate-pulse text-white"
            : "bg-gray-700 text-gray-400"
        }`}
      >
        {myTurn ? `Your Turn (${turn})` : `Waiting for Opponent (${turn})`}
      </span>
    </div>
  );
}
