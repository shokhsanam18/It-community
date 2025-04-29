import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function CustomCarousel({ slides, navigate }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (diff > 50) next();
    else if (diff < -50) prev();

    touchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-2xl mt-6">
      <div
        className="bg-white rounded-xl shadow-lg px-10 py-10 text-gray-700 animate-fade-in-up delay-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Arrows */}
        <div className="absolute top-1/2 left-1 -translate-y-1/2 z-10">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`p-2 rounded-full shadow transition bg-white hover:bg-gray-100 ${
              current === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <FaArrowLeft className="text-[#77c042]" />
          </button>
        </div>
        <div className="absolute top-1/2 right-1 -translate-y-1/2 z-10">
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className={`p-2 rounded-full shadow transition bg-white hover:bg-gray-100 ${
              current === slides.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <FaArrowRight className="text-[#77c042]" />
          </button>
        </div>

        {/* Render slide with navigate if needed */}
        {typeof slides[current] === "function" ? slides[current](navigate) : slides[current]}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full transition ${
              i === current ? "bg-[#77c042]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}