import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudioStore } from "../store/useAudioStore";

export default function MusicToggle() {
  const { musicPlaying, setMusicPlaying, audioRef } = useAudioStore();

  const toggleMusic = () => {
    if (!audioRef) return;
    if (musicPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div
      className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-[#77c042] transition"
      onClick={toggleMusic}
      title={musicPlaying ? "Pause Music" : "Play Music"}
    >
      {musicPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
    </div>
  );
}
