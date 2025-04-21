import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { questions, explanations } from "../data/questions";
import { toast } from "react-toastify";
import GameCanvas from "../components/GameCanvas";


// Explanations pulled from the FAQ


export const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleChange = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleSubmit = () => {
    const userAnswer = answers[currentQuestion.id];
  
    if (!userAnswer) {
      toast.warn("Please select an answer before proceeding.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }
  
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
  
    if (isCorrect) {
      setShowFireworks(true);
  
      setTimeout(() => {
        setShowFireworks(false);
        goNext();
      }, 2500);
    } else {
      const explanation = explanations[currentQuestion.id] || "Check the rules in the FAQ for more info.";
      setCurrentExplanation(explanation);
      setShowModal(true);
    }
  };
  
  const goNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Delay navigation here too, in case last confetti needs to finish
      setTimeout(() => {
        navigate("/Final", { state: { answers } });
      }, 500); // Slight delay feels smoother
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] px-4 py-8 flex flex-col items-center relative">
      {showFireworks && (
          <Confetti
            recycle={false}
            numberOfPieces={300}
            gravity={0.3}
            tweenDuration={1000}
          />
        )}
      <ToastContainer />

      {/* Map */}
      <div className="flex items-center justify-center mb-8 flex-wrap gap-3 max-w-5xl">
        
        {questions.map((_, index) => {
          const isCurrent = index === currentQuestionIndex;
          const isCompleted = index < currentQuestionIndex;

          return (
            <div key={index} className="relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  isCurrent
                    ? "border-green-600 bg-green-100 animate-bounce text-green-800"
                    : isCompleted
                    ? "border-green-300 bg-green-300 text-white"
                    : "border-gray-300 bg-white text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {isCurrent && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <GameCanvas />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-green-200 text-center">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          {currentQuestion.question}
        </p>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option;

            return (
              <label
                key={option}
                className={`block px-4 py-2 rounded-lg border cursor-pointer text-gray-800 transition-all ${
                  isSelected
                    ? "bg-green-100 border-green-500"
                    : "bg-white border-gray-200 hover:bg-green-50 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={isSelected}
                  className="mr-2"
                  onChange={() => handleChange(option)}
                />
                {option}
              </label>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!answers[currentQuestion.id]}
          className={`w-full mt-6 font-medium py-3 rounded-full transition ${
            answers[currentQuestion.id]
              ? "bg-[#77c042] hover:bg-[#5cb452] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>

      {/* Progress */}
      <div className="mt-6 text-gray-700 text-sm">
        Checkpoint {currentQuestionIndex + 1} / {totalQuestions}
      </div>

      {/* ❌ Incorrect Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/50 shadow-2xl flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl border border-green-200">
            <h2 className="text-lg font-semibold text-red-600 mb-2">Incorrect</h2>
            <p className="text-gray-800 mb-3">
              <strong>Correct Answer:</strong> {currentQuestion.correctAnswer}
            </p>
            <div className="mb-4">
            <h3 className="text-sm font-semibold text-green-600 mb-1 uppercase tracking-wide">Explanation</h3>
              <p className="text-sm text-gray-700">{currentExplanation}</p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                goNext();
              }}
              className="px-6 py-2 bg-[#77c042] text-white rounded-full font-medium hover:bg-[#5cb452] transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
