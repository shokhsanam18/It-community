import React, { useEffect } from "react";
import { useAudioStore } from "../store/useAudioStore";

export default function EnableMusicToast() {
  const {
    audioRef,
    showEnableToast,
    setShowEnableToast,
    setAudioStarted,
    setMusicPlaying,
    setMuted,
    audioStarted,
  } = useAudioStore();

  const handleTap = () => {
    if (!audioRef || audioStarted) return;

    try {
      audioRef.muted = false;
      audioRef.volume = 0;
      setMuted(false);

      const playPromise = audioRef.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioStarted(true);
            setMusicPlaying(true);
            setShowEnableToast(false);
            const fadeIn = setInterval(() => {
              if (audioRef.volume < 1) {
                audioRef.volume = Math.min(1, audioRef.volume + 0.1);
              } else {
                clearInterval(fadeIn);
              }
            }, 200);
          })
          .catch((err) => {
            console.error("Manual play failed:", err);
          });
      }
    } catch (err) {
      console.error("Manual play error:", err);
    }
  };

  if (!showEnableToast) return null;

  return (
    <button
      onClick={handleTap}
      onTouchStart={handleTap}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#333] text-white px-4 py-2 rounded-lg shadow-lg z-50 active:scale-95 transition"
    >
      Tap here to enable background music 🎵
    </button>
  );
}