import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAudioStore } from "../store/useAudioStore";
import useIsMobile from "../hooks/useIsMobile";

export default function AudioPlayer() {
  const isMobile = useIsMobile();
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
  const allowedPaths = ["/", "/rules", "/tryagain"];

  // 1️⃣ Reset audio state if switching to mobile
  useEffect(() => {
    if (isMobile) {
      setAudioStarted(false);
    }
  }, [isMobile, setAudioStarted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || isMobile) return;

    setAudioRef(audio);
    audio.muted = isMuted;

    // 2️⃣ Try playing again if audio hasn't started yet
    if (!audioStarted) {
      audio.volume = 0;

      // Delay ensures the <audio> tag is ready before play
      setTimeout(() => {
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
          .catch(() => {
            setTimeout(() => {
              setShowEnableToast(true);
            }, 200);
          });
      }, 100); // ⏱ slight delay to ensure DOM mounts first
    }
  }, [
    isMobile,
    isMuted,
    audioStarted,
    setAudioRef,
    setAudioStarted,
    setMusicPlaying,
    setShowEnableToast,
  ]);

  if (isMobile) return null;
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