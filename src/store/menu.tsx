import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MenuItem {
  is_active: boolean;
  link_to: string;
  name: string;
  icon_active: string;
  icon_inactive: string;
  count_notification: number;
}

type MenuStore = {
  minimizeMenu: boolean;
  selectedMenu: MenuItem;
  menuList: MenuItem[];
  setSelectedMenu: (data: MenuItem) => void;
  setMenuList: (data: MenuItem[]) => void;
  emptyMenuList: () => void;
  setMinimizeMenu: (data: boolean) => void;
};

const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      minimizeMenu: false,
      selectedMenu: {} as MenuItem,
      menuList: [],
      setSelectedMenu: (data) => set(() => ({ selectedMenu: data })),
      setMenuList: (data: MenuItem[]) => set(() => ({ menuList: data })),
      emptyMenuList: () => set(() => ({ menuList: [] })),
      setMinimizeMenu: (data: boolean) => set(() => ({ minimizeMenu: data })),
    }),
    {
      name: "menu-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMenuStore;
