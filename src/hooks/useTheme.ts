import { useEffect } from "react";
import { Theme } from "../enums/theme.enum";
import { useThemeStore } from "../stores/theme.store";

const updateMetaThemeColor = (theme: Theme) => {
  const metaColorSheme = document.querySelector("meta[name=color-scheme]");

  if (metaColorSheme && "content" in metaColorSheme) {
    if (theme === Theme.DARK) {
      metaColorSheme.content = "dark light";
    } else {
      metaColorSheme.content = "light dark";
    }
  }

  const metaThemeColor = document.querySelector(
    "meta[name=theme-color]:not([media])"
  );

  const themeMap = {
    dark: "#0a1429",
    light: "#d6e0f5",
  };

  if (!metaThemeColor && theme !== Theme.AUTO) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = themeMap[theme];
    document.head.appendChild(meta);
  }

  if (metaThemeColor && "content" in metaThemeColor) {
    if (theme === Theme.AUTO) {
      document.head.removeChild(metaThemeColor);
    } else {
      metaThemeColor.content = themeMap[theme];
    }
  }
};

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    const storage = JSON.parse(localStorage.theme) as
      | {
          state: { theme: Theme };
        }
      | undefined;
    const prefersDarkMQ = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (
      storage?.state.theme === Theme.DARK ||
      (storage?.state.theme === Theme.AUTO && prefersDarkMQ)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const prefersDarkMQ = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (prefersDarkMQ.matches) {
        updateMetaThemeColor(Theme.DARK);
        document.documentElement.classList.add("dark");
      } else {
        updateMetaThemeColor(Theme.LIGHT);
        document.documentElement.classList.remove("dark");
      }
    };

    prefersDarkMQ.addEventListener("change", handleChange);

    return () => prefersDarkMQ.removeEventListener("change", handleChange);
  }, [setTheme]);

  // Whenever the user explicitly chooses light mode
  const setLight = () => {
    setTheme(Theme.LIGHT);
    updateMetaThemeColor(Theme.LIGHT);
    document.documentElement.classList.remove("dark");
  };

  // Whenever the user explicitly chooses dark mode
  const setDark = () => {
    setTheme(Theme.DARK);
    updateMetaThemeColor(Theme.DARK);
    document.documentElement.classList.add("dark");
  };

  // Whenever the user explicitly chooses to respect the OS preference
  const setDefault = () => {
    setTheme(Theme.AUTO);
    updateMetaThemeColor(Theme.AUTO);

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { setLight, setDark, setDefault };
};
