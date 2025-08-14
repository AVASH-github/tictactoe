import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import calculateWinner from "../utils/calculateWinner";

export default function useSocket(roomId) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [myTurn, setMyTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const socketRef = useRef();

  // Check for winner
  useEffect(() => {
    const w = calculateWinner(board);
    if (w) {
      setWinner(w);
      setMyTurn(false);
    }
  }, [board]);
//check for draw
useEffect(() => {
  const w = calculateWinner(board);
  if (w) {
    setWinner(w);
    setMyTurn(false);
  } else if (board.every(cell => cell !== null)) {
    setWinner("Draw");
    setMyTurn(false);
  }
}, [board]);

  // Reset game function
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
    setMyTurn(true);

    socketRef.current.emit("reset-game", { roomId });
  };

  // Listen for reset event from server
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("reset-board", () => {
      setBoard(Array(9).fill(null));
      setTurn("X");
      setWinner(null);
      setMyTurn(true);
    });
  }, []);

  // Socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    socketRef.current.emit("join-room", roomId);

    socketRef.current.on("update-board", ({ board, turn }) => {
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

  return { board, turn, myTurn, winner, makeMove, resetGame };
}
