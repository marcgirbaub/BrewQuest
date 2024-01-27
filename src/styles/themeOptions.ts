import { ThemeOptions } from "@mui/material";
import { breakpoints } from "./breakpoints";

export type ThemeMode = "light" | "dark";

export function buildThemeOptions(theme: ThemeMode) {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: theme,
      background: {
        default: theme === "light" ? "fff" : "#353535",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl,
      },
    },

    typography: {
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.4rem",
        fontWeight: 500,
      },
    },
  };

  return themeOptions;
}
