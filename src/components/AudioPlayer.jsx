import React, { useEffect, useRef } from "react";
import { useAudioStore } from "../store/useAudioStore";
import { useLocation } from "react-router-dom";

export default function AudioPlayer() {
  const {
    setAudioRef,
    setMusicPlaying,
    setAudioStarted,
    audioStarted,
    isMuted,
    setShowEnableToast,
  } = useAudioStore();

  const audioRef = useRef(null);
  const location = useLocation();
  const allowedPaths = ["/", "/rules", "/tryagain",];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioRef(audio);
    audio.muted = isMuted;

    if (allowedPaths.includes(location.pathname)) {
      if (!audioStarted) {
        audio.volume = 0;

        audio.play()
          .then(() => {
            setAudioStarted(true);
            setMusicPlaying(true);

            const fadeIn = setInterval(() => {
              if (audio.volume < 1) {
                audio.volume = Math.min(1, audio.volume + 0.1);
              } else {
                clearInterval(fadeIn);
              }
            }, 200);
          })
          .catch((err) => {
            console.warn("Autoplay blocked:", err.message);
            setShowEnableToast(true);
          });
      }
    } else {
      if (!audio.paused) {
        audio.pause();
        setMusicPlaying(false);
      }
    }
  }, [
    location.pathname,
    setAudioRef,
    setMusicPlaying,
    isMuted,
    audioStarted,
    setAudioStarted,
    setShowEnableToast,
  ]);

  return (
    <audio
      ref={audioRef}
      loop
      src="./music.mp3"
      preload="auto"
      style={{ display: "none" }}
      playsInline
    />
  );
}