import { ThemeOptions } from "@mui/material";
import { breakpoints } from "./breakpoints";

export type ThemeMode = "light" | "dark";

export const getCustomThemeOptions = (theme: ThemeMode): ThemeOptions => {
  return {
    palette: {
      mode: theme,
      primary: {
        main: theme === "light" ? "#185E47" : "#2CAD84",
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
};
