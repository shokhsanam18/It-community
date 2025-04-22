import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudioStore } from "../store/useAudioStore";
import MusicToggle from "../components/MusicToggle";
import { useUserStore } from "../store/useUserStore";

export default function Welcome() {
  const fullname = useUserStore((state) => state.fullname);
  const setFullname = useUserStore((state) => state.setFullname);
  const navigate = useNavigate();
  const { setMusicPlaying } = useAudioStore();

  const handleStart = () => {
    if (fullname.trim()) {
      setFullname(fullname);
      navigate("/rules");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] flex flex-col items-center justify-center px-4 text-center relative">
      {/* Music Toggle */}
      <MusicToggle />

      {/* Logo */}
      <a href="hhtps://itcom.uz/">
        <img
          src="/logo.png"
          alt="IT Community Logo"
          className="w-44 mb-3 animate-fade-in-up"
        />
      </a>

      <h1 className="text-3xl font-semibold text-gray-800 mb-4 animate-fade-in-up delay-100">
        Welcome to <span className="text-[#77c042]">Commventure!</span>
      </h1>

      <input
        type="text"
        placeholder="First & Last Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter" && fullname.trim()) {
              handleStart();
            }
        }}
        className="border border-gray-300 rounded-full px-5 py-3 w-full max-w-xs text-gray-800 mb-4 shadow-sm focus:ring-2 focus:ring-[#5cb452] outline-none transition-all duration-300 animate-fade-in-up delay-200"
      />

      <button
        onClick={handleStart}
        disabled={!fullname.trim()}
        className={`px-6 py-3 rounded-full font-medium text-white shadow-md transition-all duration-300 animate-fade-in-up delay-300 ${
          fullname.trim()
            ? "bg-[#77c042] cursor-pointer hover:bg-[#5cb452]"
            : "bg-[#828583] cursor-not-allowed"
        }`}
      >
        Start Game
      </button>

      {/* Instructions */}
      <p className="text-sm text-gray-500 mt-4 max-w-xs">
        Enter your name and begin your onboarding journey!
      </p>
    </div>
  );
}
