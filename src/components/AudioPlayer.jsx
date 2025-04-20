import React, { useEffect, useRef } from "react";
import { useAudioStore } from "../store/useAudioStore";
import { useLocation } from "react-router-dom";

export default function AudioPlayer() {
  const { setAudioRef, setMusicPlaying } = useAudioStore();
  const audioRef = useRef(null);
  const location = useLocation();

  const allowedPaths = ["/", "/rules"];

  useEffect(() => {
    const audio = audioRef.current;
    setAudioRef(audio);

    // Only play/pause depending on route
    if (allowedPaths.includes(location.pathname)) {
      if (audio.paused) {
        try {
          audio.play();
          audio.volume = 0;
          const fadeIn = setInterval(() => {
            if (audio.volume < 1) {
              audio.volume = Math.min(1, audio.volume + 0.1);
            } else {
              clearInterval(fadeIn);
            }
          }, 200);
        } catch (err) {
          console.warn("Autoplay blocked:", err.message);
        }
      }
      setMusicPlaying(true);
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  }, [location.pathname, setAudioRef, setMusicPlaying]);

  return (
    <audio
      ref={audioRef}
      loop
      src="/music.mp3"
      preload="auto" // helpful for faster initial load
      style={{ display: "none" }} // optional, hides the audio element
    />
  );
}