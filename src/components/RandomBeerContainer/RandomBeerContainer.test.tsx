import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockListOfBeers } from "../../mocks/beerMocks";
import RandomBeerContainer from "./RandomBeerContainer";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";

vi.mock("../../hooks/useGetBeers/useGetBeers");

describe("Given a RandomBeerContainer component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  describe("When the useGetBeers hook returns isLoading and isFetching set to true", () => {
    beforeEach(() => {
      (useGetBeers as Mock).mockReturnValueOnce({
        isLoading: true,
        isFetching: true,
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

    test("Then it should display a skeleton with the loading text", () => {
      const ariaLabelText = "Loading beer information";

      const loadingText = screen.getByLabelText(ariaLabelText);

      expect(loadingText).toBeInTheDocument();
    });
  });

  describe("When the useGetBeer returns a list of 3 beers and the user clicks on the `Another Beer` button", () => {
    test("Then it should display the name of the second beer in the list and not display the name of the first beer", () => {
      const mockRefetch = vi.fn();
      (useGetBeers as Mock).mockReturnValueOnce({
        beers: mockListOfBeers,
        isLoading: false,
        isFetching: false,
        refetch: mockRefetch,
      });

      render(<RandomBeerContainer />);

      const button = screen.getByRole("button", { name: "Another Beer" });
      fireEvent.click(button);

      const firstBeerNameElement = screen.queryByText(mockListOfBeers[0].name);
      const secondBeerNameElement = screen.getByText(mockListOfBeers[1].name);

      expect(firstBeerNameElement).not.toBeInTheDocument();
      expect(secondBeerNameElement).toBeInTheDocument();
    });
  });

  describe("When the useGetBeer hook return isError set to true", () => {
    test("Then it should display an error message and an image with the alt text `Beer not found`", () => {
      (useGetBeers as Mock).mockReturnValueOnce({
        isError: true,
        refetch: vi.fn(),
      });
      const errorMessageText = "Something went wrong, please try again.";

      render(<RandomBeerContainer />);

      const errorMessage = screen.getByText(errorMessageText);
      const errorImage = screen.getByRole("img", { name: "Beer not found" });

      expect(errorMessage).toBeInTheDocument();
      expect(errorImage).toBeInTheDocument();
    });
  });
});
