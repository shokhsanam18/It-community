import { create } from "zustand";

export const useAudioStore = create((set) => ({
  musicPlaying: true,
  setMusicPlaying: (isPlaying) => set({ musicPlaying: isPlaying }),
  isMuted: false,
  setMuted: (muted) => set({ isMuted: muted }),
  audioRef: null,
  setAudioRef: (ref) => set({ audioRef: ref }),
}));