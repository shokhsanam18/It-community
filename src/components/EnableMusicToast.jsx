import React, { useEffect } from "react";
import { useAudioStore } from "../store/useAudioStore";

export default function EnableMusicToast() {
  const {
    audioRef,
    setShowEnableToast,
    setAudioStarted,
    setMusicPlaying,
    setMuted,
  } = useAudioStore();

  useEffect(() => {
    const handleUserInteraction = () => {

      if (audioRef) {
        try {
            audioRef.muted = false;
            audioRef.volume = 0; // start from 0 volume
            setMuted(false);
            
            const playPromise = audioRef.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setAudioStarted(true);
                  setMusicPlaying(true);
                  setShowEnableToast(false);
            
                  // Fade in volume
                  const fadeIn = setInterval(() => {
                    if (audioRef.volume < 1) {
                      audioRef.volume = Math.min(1, audioRef.volume + 0.1);
                    } else {
                      clearInterval(fadeIn);
                    }
                  }, 200);
                })
                .catch((err) => {
                  console.error("❌ play() failed on interaction:", err);
                });
            }
            
        } catch (err) {
          console.error("❗ Unexpected error in toast:", err);
        }
      } else {
        console.warn("⚠️ audioRef is still null");
      }

      // Clean up
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [
    audioRef,
    setShowEnableToast,
    setAudioStarted,
    setMusicPlaying,
    setMuted,
  ]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#333] text-white px-4 py-2 rounded-lg shadow-lg z-50">
      Tap anywhere to enable background music 🎵
    </div>
  );
}
