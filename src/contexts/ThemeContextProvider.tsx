import { ReactElement, createContext, useMemo, useState } from "react";
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
  const [usedTheme, setUsedTheme] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setUsedTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  console.log("usedTheme", usedTheme);
  const theme = createTheme(buildThemeOptions(usedTheme));

  const store = useMemo(
    () => ({
      theme: usedTheme,
      toggleTheme,
    }),
    [usedTheme],
  );

  return (
    <ThemeContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
