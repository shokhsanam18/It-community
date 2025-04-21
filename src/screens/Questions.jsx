import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { questions, explanations } from "../data/questions";
import { toast } from "react-toastify";
import GameCanvas from "../components/GameCanvas";

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
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setTimeout(() => {
        navigate("/Final", { state: { answers } });
      }, 500);
    }
  };

  const progressPercentage = Math.round(((currentQuestionIndex) / totalQuestions) * 100);

  return (
    <div
        className={`min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] px-4 py-8 flex flex-col items-center relative transition-all duration-300 ${
          showFireworks ? "overflow-hidden" : ""
        }`}
        role="main"
        aria-label="Questionnaire Interface"
      >
      {showFireworks && (
        <Confetti recycle={false} numberOfPieces={300} gravity={0.3} tweenDuration={1000} />
      )}
      <ToastContainer />

      {/* Map */}
      <div
        className="flex items-center justify-center mb-8 flex-wrap gap-3 max-w-5xl"
        role="navigation"
        aria-label="Question Navigation Dots"
      >
        {questions.map((_, index) => {
          const isCurrent = index === currentQuestionIndex;
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

      {/* Question Card */}
      <div
          className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-green-200 text-center animate-fadeInUp"
          role="region"
          aria-label={`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
        >
        <p className="text-lg font-semibold text-gray-800 mb-4">{currentQuestion.question}</p>

        <div className="space-y-3" role="radiogroup" aria-label="Answer choices">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option;

            return (
              <label
                key={option}
                className={`block px-4 py-2 rounded-lg border cursor-pointer text-gray-800 transition-transform transform hover:scale-[1.02] duration-300 ease-in-out ${
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
                  aria-checked={isSelected}
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
          aria-disabled={!answers[currentQuestion.id]}
          aria-label="Submit answer"
        >
          {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
        </button>
      </div>

      {/* Progress % Bar */}
      <div className="w-full max-w-2xl mt-4" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100" aria-label="Progress">
        <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 bg-[#77c042] rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
        </div>
        <p className="mt-1 text-center text-sm text-gray-600">{progressPercentage}% Complete</p>
      </div>

      {/* ❌ Incorrect Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/50 shadow-2xl flex items-center justify-center z-50 px-4">
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl border border-green-200 animate-fadeInUp"
            role="dialog"
            aria-modal="true"
            aria-label="Incorrect Answer Feedback"
          >
            <h2 className="text-lg font-semibold text-red-600 mb-4">Incorrect Answer</h2>

            <div className="text-left space-y-3">
              <p className="text-sm text-gray-800 font-medium">{currentQuestion.question}</p>

              <div className="bg-red-100 border border-red-300 text-red-800 rounded p-2 text-sm">
                <strong>Your answer:</strong> {answers[currentQuestion.id]}
              </div>

              <div className="bg-green-100 border border-green-300 text-green-800 rounded p-2 text-sm">
                <strong>Correct answer:</strong> {currentQuestion.correctAnswer}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">
                  Explanation
                </h3>
                <p className="text-sm text-gray-700 leading-snug">{currentExplanation}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                goNext();
              }}
              className="mt-6 px-6 py-2 bg-[#77c042] text-white rounded-full font-medium hover:bg-[#5cb452] transition"
              aria-label="Continue to next question"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
