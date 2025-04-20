import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

export const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
      correctAnswer: "JavaScript",
    },
    {
      id: 2,
      question: "What is your preferred development environment?",
      options: ["VS Code", "IntelliJ", "Eclipse", "Other"],
      correctAnswer: "VS Code",
    },
    {
      id: 3,
      question: "How many years of coding experience do you have?",
      options: ["0-1", "2-3", "4-5", "5+"],
      correctAnswer: "5+",
    },
  ];

  const handleChange = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = answers[currentQuestion.id];

    if (userAnswer === currentQuestion.correctAnswer) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 3000);
    } else {
      toast.error("Incorrect!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 3000);
    } else {
      setTimeout(() => {
        console.log("Submitted Answers:", answers);
        navigate("/Final", { state: { answers } });
      }, 3000);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-8">
      {showFireworks && <Confetti />}
      <ToastContainer />
      <h1 className="text-3xl font-bold text-green-600 mb-6">Questionnaire</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-green-200">
        <p className="text-lg font-semibold text-green-700 mb-4">
          {currentQuestion.question}
        </p>
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <label
              key={option}
              className="block bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg cursor-pointer transition"
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                className="mr-2"
                onChange={() => handleChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition mt-6"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};
