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
    if (!audioRef) return; // Wait for the <audio> to be registered
  
    const handleUserInteraction = () => {
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
              setShowEnableToast(false); // ✅ hide toast after successful play
  
              const fadeIn = setInterval(() => {
                if (audioRef.volume < 1) {
                  audioRef.volume = Math.min(1, audioRef.volume + 0.1);
                } else {
                  clearInterval(fadeIn);
                }
              }, 200);
            })
            .catch((err) => {
              console.error("❌ Audio play() failed:", err);
            });
        }
      } catch (err) {
        console.error("❗ Error in enabling audio:", err);
      }
  
      // ✅ Clean up
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
  
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [audioRef]); // ✅ only register once audioRef is ready

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#333] text-white px-4 py-2 rounded-lg shadow-lg z-50">
      Tap anywhere to enable background music 🎵
    </div>
  );
}
