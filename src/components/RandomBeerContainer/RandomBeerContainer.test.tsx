import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockListOfBeers } from "../../mocks/beerMocks";
import RandomBeerContainer from "./RandomBeerContainer";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";

vi.mock("../../hooks/useGetBeers/useGetBeers");

describe("Given a RandomBeerContainer component", () => {
  describe("When the useGetBeers hook returns a list of beers", () => {
    beforeEach(() => {
      (useGetBeers as Mock).mockReturnValue({
        beers: mockListOfBeers,
        isLoading: false,
        refetch: vi.fn(),
      });

      render(<RandomBeerContainer />);
    });

    test("Then it should display a title heading with then name of the first beer `Buzz`", () => {
      const beerName = mockListOfBeers[0].name;

      const nameHeading = screen.getByRole("heading", {
        name: beerName,
        level: 3,
      });

      expect(nameHeading).toBeInTheDocument();
    });

    test("Then it should display a paragraph with the description of the first beer", () => {
      const beerDescription = mockListOfBeers[0].description;

      const descriptionParagraph = screen.getByText(beerDescription);

      expect(descriptionParagraph).toBeInTheDocument();
    });

    test("Then it should display an image with an alt text equal to `Buzz berr` corresponding of the first beer", () => {
      const beerName = mockListOfBeers[0].name;

      const beerImage = screen.getByRole("img", { name: `${beerName} beer` });

      expect(beerImage).toBeInTheDocument();
    });
  });

  describe("When the useGetBeers hook returns isLoading set to true", () => {
    beforeEach(() => {
      (useGetBeers as Mock).mockReturnValue({
        isLoading: true,
        refetch: vi.fn(),
      });

      render(<RandomBeerContainer />);
    });

    test("Then it should not display a title heading with then name of the first beer `Buzz`", () => {
      const beerName = mockListOfBeers[0].name;

      const nameHeading = screen.queryByRole("heading", {
        name: beerName,
        level: 3,
      });

      expect(nameHeading).not.toBeInTheDocument();
    });
  });
});
