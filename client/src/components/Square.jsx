import React from "react";

export default function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!!value}
      className={`
        w-24 h-24 flex items-center justify-center rounded-lg
        bg-gradient-to-br from-indigo-900 to-blue-800
        border-2 border-indigo-500
        text-6xl font-extrabold text-white
        cursor-pointer transition-all duration-300
        hover:border-indigo-300 hover:shadow-neon
        disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400
      `}
    >
      {value}
    </button>
  );
}
