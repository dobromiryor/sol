import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "../enums/theme.enum";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme | undefined) => void;
}

const getThemeFromStorage = () => {
  try {
    const themeString = localStorage.getItem("theme");
    if (themeString) {
      const theme: { state: { theme: Theme } } = JSON.parse(themeString);

      return theme.state.theme;
    }
  } catch (error) {
    console.error("Error retrieving theme data from localStorage", error);
  }

  return undefined;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getThemeFromStorage() ?? Theme.AUTO,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme",
      partialize: ({ theme }) => ({ theme }),
    }
  )
);
