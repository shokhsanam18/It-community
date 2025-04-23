import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      fullname: "",
      bio: "",
      referrer: "",
      setFullname: (fullname) => set({ fullname }),
      setBio: (bio) => set({ bio }),
      setReferrer: (referrer) => set({ referrer }),
      resetUser: () => set({ fullname: "", bio: "", referrer: "" }),
    }),
    {
      name: "user-store",
    }
  )
);