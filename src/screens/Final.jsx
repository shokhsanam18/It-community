import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Final() {
  const { state } = useLocation();
  const name = state?.name || "";

  const [bio, setBio] = useState("");
  const [referrer, setReferrer] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Congratulations!</h2>
      <p className="text-gray-700 mb-6">You’ve successfully completed the volunteer onboarding path!</p>

      <a
        href="https://t.me/yourcommunitychat"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4"
      >
        Join Telegram Chat
      </a>

      <div className="w-full max-w-md text-left bg-gray-100 p-4 rounded">
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input value={name} readOnly className="w-full px-3 py-2 mt-1 border rounded" />
        </div>

        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">Short Bio</label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 mt-1 border rounded"
            placeholder="E.g. I’m passionate about helping others and building cool things!"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Referred by</label>
          <input
            type="text"
            className="w-full px-3 py-2 mt-1 border rounded"
            placeholder="@username or full name"
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}