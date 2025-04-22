import React, { useEffect } from "react";
import { useAudioStore } from "../store/useAudioStore";
import useIsMobile from "../hooks/useIsMobile"; // 👈

export default function EnableMusicToast() {
  const isMobile = useIsMobile(); // 👈
  const {
    audioRef,
    setShowEnableToast,
    setAudioStarted,
    setMusicPlaying,
    setMuted,
    audioStarted,
  } = useAudioStore();

  useEffect(() => {
    if (isMobile || !audioRef || audioStarted) return;

    const handleUserInteraction = () => {
      if (audioStarted) return;

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
            .catch(console.error);
        }
      } catch (err) {
        console.error(err);
      }

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
  }, [isMobile, audioRef, audioStarted]);

  if (isMobile) return null; // 👈 no toast on mobile
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#333] text-white px-4 py-2 rounded-lg shadow-lg z-50">
      Tap anywhere to enable background music 🎵
    </div>
  );
}
