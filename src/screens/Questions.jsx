import React, {useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import GameCanvas from "../components/GameCanvas";
import IncorrectModal from "../components/IncorrectModal";
import { useQuestionStore } from "../store/useQuestionStore";

export const Questions = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    totalQuestions,
    answers,
    handleChange,
    handleSubmit,
    showFireworks,
    showModal,
    initializeQuiz,
  } = useQuestionStore();


  useEffect(() => {
    if (!questions || questions.length === 0) {
      initializeQuiz();
    }
  }, []);

  useEffect(() => {
    if (showFireworks) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "";
    }
  
    return () => {
      document.body.style.overflowX = "";
    };
  }, [showFireworks]);
  
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading quiz...</p>
      </div>
    );
  }

  const onSubmit = () => {
    const success = handleSubmit(navigate);
    if (!success) {
      toast.warn("Please select an answer before proceeding.");
    }
  };

  const progressPercentage = Math.round((currentQuestionIndex / totalQuestions) * 100);


  

  return (
    <div
      className={`min-h-screen px-4 py-8 flex flex-col items-center transition-all duration-300 bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] ${
        showFireworks ? "overflow-hidden" : ""
      }`}
    >
      {showFireworks && <Confetti width={window.innerWidth} recycle={false} numberOfPieces={1200} gravity={0.2} wind={0.01} initialVelocityY={10} />}
      <ToastContainer />

      <div
        className="flex items-center justify-center mb-8 flex-wrap gap-3 max-w-5xl"
        role="navigation"
        aria-label="Question Navigation Dots"
      >
        {questions.map((_, index) => {
          const isCurrent = index === currentQuestionIndex && !showFireworks;
          const isCompleted = index < currentQuestionIndex;

          return (
            <div key={index} className="relative">
              <div
                className={`w-8 h-8 mb-5 sm:mb-2 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  isCurrent
                    ? "border-gray-600 bg-gray-200 animate-bounce text-green-800"
                    : isCompleted
                    ? answers[questions[index].id] === questions[index].correctAnswer
                      ? "border-green-300 bg-green-300 text-white"
                      : "border-red-400 bg-red-400 text-white"
                    : "border-gray-300 bg-white text-gray-600"
                }`}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Checkpoint ${index + 1}`}
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
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl text-center border shadow-lg">
        <p className="text-lg font-semibold text-gray-800 mb-4">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option;
            return (
              <label
                key={option}
                className={`block px-4 py-2 border rounded-lg cursor-pointer ${
                  isSelected ? "bg-green-100 border-green-500" : "bg-white border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleChange(option)}
                  className="mr-2"
                  disabled={showFireworks}
                />
                {option}
              </label>
            );
          })}
        </div>

        <button
          onClick={onSubmit}
          disabled={!answers[currentQuestion.id] || showFireworks}
          className={`w-full mt-6 py-3 cursor-pointer rounded-full font-medium transition ${
            answers[currentQuestion.id]
              ? "bg-[#77c042] hover:bg-[#5cb452] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
        </button>
      </div>

      <div className="w-full max-w-2xl mt-4">
        <div className="bg-gray-200 h-3 rounded-full">
          <div
            className="h-3 bg-[#77c042] rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-1">{progressPercentage}% Complete</p>
      </div>

      {showModal && <IncorrectModal navigate={navigate} />}
    </div>
  );
};
