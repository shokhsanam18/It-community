import React from "react";
import { useNavigate } from "react-router-dom";
import MusicToggle from "../components/MusicToggle";
import { useQuestionStore } from "../store/useQuestionStore";

export default function TryAgain() {
  const navigate = useNavigate();
  const resetQuiz = useQuestionStore((state) => state.resetQuiz);

  const handleTryAgain = () => {
    resetQuiz();
    navigate("/rules");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] flex flex-col items-center justify-center text-center px-4 py-10 relative">
      <MusicToggle />
      <img src="/logo.png" alt="Logo" className="w-44 mb-6" />

      <h2 className="text-3xl font-semibold text-red-600 mb-4 animate-fade-in-up">
        Oops! Not quite there.
      </h2>
      <p className="text-gray-700 max-w-md mb-6 animate-fade-in-up delay-100">
        Some of your answers were incorrect. But don’t worry — you can try again!
        Review the rules and give it another go. You've got this! 💪
      </p>

      <button
        onClick={handleTryAgain}
        className="bg-[#77c042] hover:bg-[#5cb452] text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 animate-fade-in-up delay-200"
      >
        Try Again
      </button>
    </div>
  );
}