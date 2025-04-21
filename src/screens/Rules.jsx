import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import MusicToggle from "../components/MusicToggle";

export default function Rules() {
    const { state } = useLocation();
    const name = state?.name || "Volunteer";
    const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] px-4 py-8 relative flex flex-col items-center">
      

      {/* Music Toggle */}
      <MusicToggle />

      {/* Logo in top-left */}
      <img
        src="/logo.png"
        alt="IT Community Logo"
        className="absolute top-4 left-4 w-44"
      />

      {/* Headline */}
      <h2 className="text-3xl font-semibold text-gray-800 mt-20 text-center animate-fade-in-up">
        Community Guidelines & <span className="text-[#77c042]">Onboarding</span>
        </h2>

        <div className="bg-white rounded-xl shadow-lg mt-6 p-6 w-full max-w-2xl text-gray-700 animate-fade-in-up delay-100">
        <ul className="list-disc list-inside space-y-3 text-left leading-relaxed">
          <li>
            <span className="text-[#77c042] font-semibold">Respect:</span> Be kind, inclusive, and supportive.
          </li>
          <li>
            <span className="text-[#77c042] font-semibold">Discipline:</span> Always be on time (15 minutes early is ideal).
          </li>
          <li>
            <span className="text-[#77c042] font-semibold">Humility:</span> Be open to learning and improving.
          </li>
          <li>
            <span className="text-[#77c042] font-semibold">Relevance:</span> Keep your communication focused and meaningful.
          </li>
          <li>
            <span className="text-[#77c042] font-semibold">Fun:</span> Stay playful and enjoy your journey! 😊
          </li>
        </ul>
      </div>

      {/* Start Quest Button */}
      <button
        onClick={() => navigate("/Questions", { state: { name } })}
        className="mt-6 px-6 py-3 cursor-pointer rounded-full font-medium text-white shadow-md bg-[#77c042] hover:bg-[#5cb452] transition-all duration-300 animate-fade-in-up delay-200"
        >
        Start Quest
        </button>
    </div>
  );
}