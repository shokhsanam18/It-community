import { create } from "zustand";

export const useUserStore = create((set) => ({
  fullname: "",
  bio: "",
  referrer: "",
  setFullname: (fullname) => set({ fullname }),
  setBio: (bio) => set({ bio }),
  setReferrer: (referrer) => set({ referrer }),
}));