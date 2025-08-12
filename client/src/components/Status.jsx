export default function Status({ turn, myTurn }) {
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
