import { ThemeOptions } from "@mui/material";
import { breakpoints } from "./breakpoints";

export type ThemeMode = "light" | "dark";

export const buildThemeOptions = (theme: ThemeMode) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: theme,
      primary: {
        main: "#2CAD84",
      },
      secondary: {
        main: "#edf2ff",
      },
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
  };

  return themeOptions;
};
