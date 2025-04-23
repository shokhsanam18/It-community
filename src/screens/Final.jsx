import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuestionStore } from "../store/useQuestionStore";
import { useUserStore } from "../store/useUserStore";

export default function Final() {
  const { state } = useLocation();
  const fullname = useUserStore((state) => state.fullname);
  const bio = useUserStore((state) => state.bio);
  const referrer = useUserStore((state) => state.referrer);
  const setBio = useUserStore((state) => state.setBio);
  const setReferrer = useUserStore((state) => state.setReferrer);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    useQuestionStore.persist?.clearStorage?.(); 
    useQuestionStore.setState({ currentQuestionIndex: 0, answers: {} });
  }, []);

  const introMessage = `Hi everyone! I'm ${fullname}. ${
    bio ? bio : "[Add a short bio]"
  }. Referred by ${referrer || "[your referrer]"}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(introMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    useUserStore.getState().resetUser()
  };


  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] flex flex-col items-center justify-center text-center px-4 py-10">
      <a href="https://itcom.uz/">
        <img src="/logo.png" alt="Logo" className="w-40 mb-4" />
      </a>

      <h2 className="text-3xl font-bold text-green-700 mb-2">
        🎉 Congratulations!
      </h2>
      <p className="text-gray-700 mb-6">
        You’ve successfully completed the volunteer onboarding path!
      </p>

      <div className="w-full max-w-md text-left bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            value={fullname}
            readOnly
            className="w-full px-3 py-2 mt-1 border rounded text-gray-700 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Short Bio</label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 mt-1 border rounded"
            placeholder="E.g. I’m passionate about helping others and building cool things!"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Referred by
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 mt-1 border rounded"
            placeholder="@username or full name"
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
          />
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded mt-6">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {introMessage}
          </p>
          <button
            onClick={handleCopy}
            className="mt-3 px-4 py-2 bg-[#77c042] text-white rounded-full font-medium hover:bg-[#5cb452] transition"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
      <Link
      onClick={() => useUserStore.getState().resetUser()}
       to="https://t.me/+IJD9iZO7WyNhYTk6"
        rel="noopener noreferrer"
        className="bg-[#77c042] text-white mt-4 px-6 py-3 rounded-full font-semibold hover:bg-[#5cb452] transition mb-6 shadow"
      >
        Join Telegram Chat
      </Link>
    </div>
  );
}
