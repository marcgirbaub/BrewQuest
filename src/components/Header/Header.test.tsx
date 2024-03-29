import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Header from "./Header";
import { ThemeContextProvider } from "../../store/context/ThemeContextProvider";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading level 1 with the text `BrewQuest`", () => {
      const headerText = "BrewQuest";

      render(
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>,
      );

      const headerTitleElement = screen.getByRole("heading", {
        name: headerText,
        level: 1,
      });

      expect(headerTitleElement).toBeInTheDocument();
    });
  });
});
