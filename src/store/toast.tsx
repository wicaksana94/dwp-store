import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ToastStore = {
  isOpenToast: boolean;
  messageToast: string;
  backgroundClassToast: string;
  setMessageToast: (data: string) => void;
  setBackgroundClassToast: (data: string) => void;
  setIsOpenToast: (data: boolean) => void;
};

const useToastStore = create<ToastStore>()(
  persist(
    (set) => ({
      isOpenToast: false,
      messageToast: "",
      backgroundClassToast: "",
      setMessageToast: (data: string) => set(() => ({ messageToast: data })),
      setBackgroundClassToast: (data: string) =>
        set(() => ({ backgroundClassToast: data })),
      setIsOpenToast: (data: boolean) => set(() => ({ isOpenToast: data })),
    }),
    {
      name: "toast-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useToastStore;
