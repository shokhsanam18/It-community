import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Game() {
  const { state } = useLocation();
  const name = state?.name || "Player";
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleAnswer = (correct) => {
    if (step >= 3) {
      navigate("/final", { state: { name } });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-600 text-white px-4 py-2 flex justify-between">
        <div>👤 {name}</div>
        <div>🚩 {step} / 3</div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center">
          <h3 className="text-lg font-semibold mb-4">
            What’s our community motto?
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => handleAnswer(true)}
              className="block w-full px-4 py-2 bg-green-100 hover:bg-green-200 rounded"
            >
              Grow Together
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="block w-full px-4 py-2 bg-green-100 hover:bg-green-200 rounded"
            >
              Work Alone
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="block w-full px-4 py-2 bg-green-100 hover:bg-green-200 rounded"
            >
              Don’t Ask Questions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
