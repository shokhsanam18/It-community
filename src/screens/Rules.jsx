import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import MusicToggle from "../components/MusicToggle";
import { useUserStore } from "../store/useUserStore";
import { Carousel } from "@material-tailwind/react";

import CustomCarousel from "../components/CustomCarousel";

// Inside the Rules component
const slides = [
  // ✅ What you should/can do
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      ✅ What you <span className="text-[#77c042]">can</span> and{" "}
      <span className="text-[#77c042]">should</span> do:
    </h2>
    <ul className="list-disc list-inside space-y-3 text-left leading-relaxed">
      <li>
        <span className="text-[#77c042] font-semibold">Language:</span> You can
        write your posts and comments, or share content in Uzbek, Russian or
        English languages.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Theme:</span> Stay on
        topic. Keep discussions focused on technology and IT-related topics to
        ensure that the group remains a valuable resource for IT professionals.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Respect:</span> Be
        respectful and professional at all times.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Post:</span> If you are
        unsure whether something is appropriate to post, ask a group
        administrator or moderator for guidance.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Discipline:</span> Always
        be on time — ideally, 15 minutes early. That’s the easiest way never to
        be late
      </li>{" "}
      <li>
        <span className="text-[#77c042] font-semibold">Communication:</span>{" "}
        Please avoid sending just “hi” or “how are you.” Instead, write your
        full message right away.
      </li>{" "}
      <li>
        <span className="text-[#77c042] font-semibold">Ethics:</span> Follow
        accepted standards of ethics and morality in online communication.
      </li>
    </ul>
  </div>,

  // 🚫 What you cannot do
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-gray-800  mb-4">
      🚫 What you <span className="text-red-600 font-bold">cannot</span> do:
    </h2>
    <ul className="list-disc list-inside space-y-3 text-left leading-relaxed">
      <li>
        <span className="text-[#77c042] font-semibold">Privacy:</span> Do not
        share private conversations or messages without the other person's
        consent.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Spam:</span> Do not spam.
        Do not solicit or advertise products or services without prior approval
        from the group administrators.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Inclusivity:</span> Avoid
        bringing any political, religious and other sensitive topics in your
        posts or comments.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Security:</span> Do not
        post content that could be considered offensive or inappropriate.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Rights:</span> Do not
        post illegal or copyrighted material.
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Off-topic:</span> Do not
        post personal information about yourself or others (e.g. phone numbers,
        addresses).
      </li>
      <li>
        <span className="text-[#77c042] font-semibold">Content:</span> Do not
        post links to illegal resources, including resources with illegal
        content.
      </li>
    </ul>

    {/* <p className="mt-6">
      Please follow these guidelines and rules set forth by the group
      administrators. Failure to do so may result in removal from the community.
    </p>
    <p>
      Remember that community administrators have the right to moderate content
      and remove inappropriate messages in accordance with their rules.
    </p>
    <p>
      These rules can be modified or expanded depending on the specific
      requirements and goals of the community.
    </p>
    <p>
      By following these rules, you can help create a positive and productive
      online community where members can share their knowledge, discuss industry
      trends, ask questions, and collaborate on projects in a respectful and
      professional manner.
    </p> */}
  </div>,

  // 🟢 What is the IT COMMUNITY

  (navigate) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center animate-fade-in-up mb-5">
        {" "}
        What benefits you can get from{" "}
        <span className="text-[#77c042]">IT COMMUNITY</span>?
      </h2>
      <p>
        The IT Community is a space where tech enthusiasts grow, connect, and
        support each other.
      </p>
      <ul className="list-inside space-y-3 text-left leading-relaxed mt-4 list-none mb-5">
        <li>🤗 Welcoming and friendly environment</li>
        <li>🙌 Always helping and learning from each other</li>
        <li>🚀 Real projects you can join and contribute to</li>
        <li>🏢 Demo Days – visits to top tech companies and their campuse</li>
        <li>🎯 Access to exclusive internships and job offers</li>
        <li>🎁 Merch & certificates for active volunteers</li>
        <li>🗓 Weekly meetups with other motivated members</li>
      </ul>
      <p>
        It’s not just a community — it’s where <b>leaders</b> are born.
      </p>

      {/* 🎯 Start Button inside the card */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/Questions")}
          className="px-6 py-3 cursor-pointer rounded-full font-medium text-white shadow-md bg-[#77c042] hover:bg-[#5cb452] transition-all duration-300"
        >
          Start Quest
        </button>
      </div>
    </div>
  ),
];

export default function Rules() {
  const fullname = useUserStore((state) => state.fullname);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        navigate("/Questions");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4e7e6] to-[#b0ddaa] px-4 py-8 relative flex flex-col items-center">
      <MusicToggle />

      <a href="https://itcom.uz/">
        {" "}
        <img
          src="/logo.png"
          alt="IT Community Logo"
          className="absolute top-4 left-4 w-44"
        />
      </a>
      <h2 className="text-3xl font-semibold text-gray-800 mt-14 text-center animate-fade-in-up">
        Community Guidelines &{" "}
        <span className="text-[#77c042]">Onboarding</span>
      </h2>

      <CustomCarousel slides={slides} navigate={navigate} />
    </div>
  );
}
