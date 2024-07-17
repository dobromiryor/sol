import { useEffect } from "react";
import { Theme } from "../enums/theme.enum";
import { useThemeStore } from "../stores/theme.store";

const updateMetaThemeColor = (theme: Theme, isAuto = false) => {
  const metaColorScheme = document.querySelector("meta[name=color-scheme]");

  if (metaColorScheme && "content" in metaColorScheme) {
    if (isAuto) {
      metaColorScheme.content = "light dark";
    } else {
      switch (theme) {
        case Theme.DARK:
          metaColorScheme.content = "dark light";
          break;
        case Theme.LIGHT:
          metaColorScheme.content = "light dark";
          break;
        default:
          metaColorScheme.content = "light dark";
      }
    }
  }

  const metaThemeColor = document.querySelector(
    "meta[name=theme-color]:not([media])"
  );

  const themeMap = {
    dark: "#0F172A",
    light: "#BAE5FD",
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

interface ThemeHookProps {
  dt: number;
  sunset?: number;
  sunrise?: number;
}

export const useTheme = ({ dt, sunrise, sunset }: ThemeHookProps) => {
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

    switch (storage?.state.theme) {
      case Theme.DARK:
        document.documentElement.classList.add("dark");
        updateMetaThemeColor(Theme.DARK);
        break;
      case Theme.LIGHT:
        document.documentElement.classList.remove("dark");
        updateMetaThemeColor(Theme.LIGHT);
        break;
      case Theme.AUTO:
        if (sunrise !== undefined && sunset !== undefined) {
          if (dt >= sunrise && dt <= sunset) {
            document.documentElement.classList.remove("dark");
            updateMetaThemeColor(Theme.LIGHT, true);
          } else {
            document.documentElement.classList.add("dark");
            updateMetaThemeColor(Theme.DARK, true);
          }
        } else {
          if (prefersDarkMQ) {
            document.documentElement.classList.add("dark");
            updateMetaThemeColor(Theme.DARK, true);
          } else {
            document.documentElement.classList.remove("dark");
            updateMetaThemeColor(Theme.LIGHT, true);
          }
        }
        break;
    }
  }, [dt, sunrise, sunset, theme]);

  // Whenever the user explicitly chooses light mode
  const setLight = () => {
    setTheme(Theme.LIGHT);
    updateMetaThemeColor(Theme.LIGHT);
  };

  // Whenever the user explicitly chooses dark mode
  const setDark = () => {
    setTheme(Theme.DARK);
    updateMetaThemeColor(Theme.DARK);
  };

  // Whenever the user explicitly chooses to respect the OS preference and/or location's date time
  const setDefault = () => {
    setTheme(Theme.AUTO);
  };

  return { setLight, setDark, setDefault };
};
