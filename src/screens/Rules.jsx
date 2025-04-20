import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Rules() {
  const { state } = useLocation();
  const name = state?.name || "Volunteer";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-center flex flex-col items-center justify-center px-6 py-10">
      <img src="/logo.png" alt="IT Community Logo" className="w-20 mb-4" />
      <h2 className="text-2xl font-bold text-green-700 mb-4">Community Guidelines</h2>
      <p className="text-gray-700 mb-6">These values define who we are. Read them carefully before starting.</p>

      <div className="bg-gray-100 p-4 rounded shadow w-full max-w-lg text-left mb-6 max-h-96 overflow-y-auto">
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Respect:</strong> Be kind and inclusive.</li>
          <li><strong>Discipline:</strong> Be on time. 15 minutes early is on time.</li>
          <li><strong>Humility:</strong> Stay curious and open to learn.</li>
          <li><strong>Relevance:</strong> Keep the community discussions focused.</li>
          <li><strong>Fun:</strong> Don't forget to enjoy the process 😊</li>
        </ul>
      </div>

      <button
        onClick={() => navigate("/game", { state: { name } })}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Start Quest
      </button>
    </div>
  );
}