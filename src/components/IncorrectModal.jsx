import React from "react";
import { useQuestionStore } from "../store/useQuestionStore";

const IncorrectModal = ({ navigate }) => {
  const {
    showModal,
    currentQuestionIndex,
    answers,
    currentExplanation,
    setShowModal,
    goNext,
    questions,
  } = useQuestionStore();

  // 🧠 Get the question manually based on current index
  const currentQuestion = questions[currentQuestionIndex];

  if (!showModal || !currentQuestion) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Incorrect Answer</h2>
        <p className="text-sm font-medium text-gray-800">{currentQuestion.question}</p>

        <div className="bg-red-100 border border-red-300 text-red-800 rounded p-2 mt-3 text-sm">
          <strong>Your answer:</strong> {answers[currentQuestion.id]}
        </div>

        <div className="bg-green-100 border border-green-300 text-green-800 rounded p-2 mt-2 text-sm">
          <strong>Correct answer:</strong> {currentQuestion.correctAnswer}
        </div>

        <div className="border-t mt-4 pt-2 text-sm text-gray-700">
          <strong>Explanation:</strong> {currentExplanation}
        </div>

        <button
          className="mt-5 px-6 py-2 bg-[#77c042] text-white rounded-full hover:bg-[#5cb452] transition"
          onClick={() => {
            setShowModal(false);
            goNext(navigate);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IncorrectModal;
