import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudioStore } from "../store/useAudioStore";

export default function MusicToggle() {
  const { isMuted, setMuted, audioRef } = useAudioStore();

  const toggleMute = () => {
    if (!audioRef) return;

    const newMuted = !isMuted;
    audioRef.muted = newMuted;
    setMuted(newMuted);
  };

  return (
    <div
      className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-[#77c042] transition"
      onClick={toggleMute}
      title={isMuted ? "Unmute Music" : "Mute Music"}
    >
      {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
    </div>
  );
}