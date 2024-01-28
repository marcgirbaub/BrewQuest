import {
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeMode, buildThemeOptions } from "../styles/themeOptions";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

interface ThemeContextStructure {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextStructure>({
  theme: "light",
  toggleTheme: () => {},
});

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

  const [usedTheme, setUsedTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const localStorageTheme = window.localStorage.getItem("theme");

      if (localStorageTheme) {
        return localStorageTheme as ThemeMode;
      }
    }

    return prefersDarkMode ? "dark" : "light";
  });

  const toggleTheme = useCallback(() => {
    setUsedTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", usedTheme);
    }
  }, [usedTheme]);

  const theme = createTheme(buildThemeOptions(usedTheme));

  const store = useMemo(
    () => ({
      theme: usedTheme,
      toggleTheme,
    }),
    [toggleTheme, usedTheme],
  );

  return (
    <ThemeContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
