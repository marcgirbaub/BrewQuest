import { createContext } from "react";
import { ThemeMode } from "../../styles/getCustomThemeOptions";

interface ThemeContextStructure {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextStructure>({
  theme: "light",
  toggleTheme: () => {},
});
