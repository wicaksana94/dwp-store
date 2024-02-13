import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
}

type UserStore = {
  user: User;
  setUser: (data: User) => void;
  logoffUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (data) => set(() => ({ user: data })),
      logoffUser: () => set(() => ({ user: {} })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
