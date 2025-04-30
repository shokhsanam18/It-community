import React, { useEffect, useRef } from "react";
import { useAudioStore } from "../store/useAudioStore";

export default function AudioPlayer() {
  const {
    setAudioRef,
    isMuted,
  } = useAudioStore();

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.volume = 0;
    setAudioRef(audio); // 👈 Just set ref, don't play here
  }, [isMuted, setAudioRef]);

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