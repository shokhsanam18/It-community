import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      navigate("/rules", { state: { name } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col items-center justify-center px-4 text-center">
      <img src="./logo.png" alt="IT Community Logo" className="w-24 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Welcome to Commventure</h1>
      <p className="text-gray-700 mb-6">Your journey to join the IT Community begins here. Enter your name to start!</p>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs mb-4"
      />

      <button
        onClick={handleStart}
        disabled={!name.trim()}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Start Game
      </button>
    </div>
  );
}