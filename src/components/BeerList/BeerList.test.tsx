import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BeerList from "./BeerList";
import { mockListOfBeers } from "../../mocks/beerMocks";

describe("Given a BeerList component", () => {
  describe("When it receives a list of 2 beers", () => {
    test("Then it should show two headings with the name of the beers", () => {
      render(<BeerList beers={mockListOfBeers} />);

      mockListOfBeers.forEach((beer) => {
        expect(
          screen.getByRole("heading", { name: beer.name, level: 3 }),
        ).toBeInTheDocument();
      });
    });
  });

  describe("When it receives an empty array", () => {
    test("Then it should not show any heading  level 3 with the name of beers", () => {
      render(<BeerList beers={[]} />);

      const beerNameElement = screen.queryByRole("heading", { level: 3 });
      expect(beerNameElement).not.toBeInTheDocument();
    });
  });
});
