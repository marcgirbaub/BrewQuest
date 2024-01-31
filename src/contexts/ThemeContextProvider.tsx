import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import {
  ThemeMode,
  getCustomThemeOptions,
} from "../styles/getCustomThemeOptions";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
  children: ReactElement | ReactElement[];
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps): ReactElement => {
  const prefersDarkMode =
    window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const localStorageTheme = window.localStorage.getItem("theme");

      if (localStorageTheme) {
        return localStorageTheme as ThemeMode;
      }
    }

    return prefersDarkMode ? "dark" : "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const materialUiTheme = createTheme(getCustomThemeOptions(theme));

  const store = useMemo(
    () => ({
      theme: theme,
      toggleTheme,
    }),
    [toggleTheme, theme],
  );

  return (
    <ThemeContext.Provider value={store}>
      <ThemeProvider theme={materialUiTheme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
