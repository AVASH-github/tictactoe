import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

export default function useSocket(roomId) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [myTurn, setMyTurn] = useState(true);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    socketRef.current.emit("join-room", roomId);

    socketRef.current.on("update-board", ({ board, turn }) => {
      console.log("Received update-board", board, turn); // add this
        setBoard(board);
      setTurn(turn);
      setMyTurn(true);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const makeMove = (index) => {
    if (!myTurn || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    socketRef.current.emit("make-move", {
      roomId,
      board: newBoard,
      turn: turn === "X" ? "O" : "X",
    });

    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
    setMyTurn(false);
  };

  return { board, turn, myTurn, makeMove };
}
