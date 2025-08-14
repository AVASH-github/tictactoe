import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import calculateWinner from "../utils/calculateWinner";

export default function useSocket(roomId) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [myTurn, setMyTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [rematchRequest, setRematchRequest] = useState(null);

  const socketRef = useRef();

  // Check winner or draw
  useEffect(() => {
    const w = calculateWinner(board);
    if (w) {
      setWinner(w);
      setMyTurn(false);
    } else if (board.every((cell) => cell !== null)) {
      setWinner("Draw");
      setMyTurn(false);
    }
  }, [board]);

  // Socket connection
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socketRef.current = socket;

    socket.emit("join-room", roomId);

    socket.on("update-board", ({ board, turn }) => {
      setBoard(board);
      setTurn(turn);
      setMyTurn(true);
    });

    return () => socket.disconnect();
  }, [roomId]);

  // Make a move
  const makeMove = (index) => {
    if (!myTurn || board[index] || winner) return;

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

  // Reset game (local + server)
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
    setMyTurn(true);
    setRematchRequest(null);
    socketRef.current.emit("reset-game", { roomId });
  };

  // Rematch functions
  const requestRematch = () => {
    // Only send request, do NOT reset game here
    socketRef.current.emit("rematch-request", { roomId, from: socketRef.current.id });
  };

  const acceptRematch = () => {
    socketRef.current.emit("rematch-accepted", { roomId });
    resetGame();
  };

  const rejectRematch = () => {
    socketRef.current.emit("rematch-rejected", { roomId });
    setRematchRequest(null);
  };

  // Listen for rematch events
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleRematchRequest = ({ from }) => {
      setRematchRequest(from); // store who asked for rematch
    };

    const handleRematchAccepted = () => {
      resetGame(); // reset the game for both players
    };

    const handleRematchRejected = () => {
      alert("Opponent declined the rematch.");
      setRematchRequest(null);
    };

    socket.on("rematch-request", handleRematchRequest);
    socket.on("rematch-accepted", handleRematchAccepted);
    socket.on("rematch-rejected", handleRematchRejected);

    return () => {
      socket.off("rematch-request", handleRematchRequest);
      socket.off("rematch-accepted", handleRematchAccepted);
      socket.off("rematch-rejected", handleRematchRejected);
    };
  }, []);

  return {
    board,
    turn,
    myTurn,
    winner,
    makeMove,
    resetGame,
    rematchRequest,
    requestRematch,
    acceptRematch,
    rejectRematch,
  };
}
