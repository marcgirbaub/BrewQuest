import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchContainer from "./SearchContainer";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";
import { mockListOfBeers } from "../../mocks/beerMocks";

vi.mock("../../hooks/useGetBeers/useGetBeers");

describe("Given a SearchContainer component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When the useGetBeers hook returns a list of beers", () => {
    beforeEach(() => {
      (useGetBeers as Mock).mockReturnValue({
        beers: mockListOfBeers,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });

      render(<SearchContainer />);
    });

    test("Then it should display the Search heading", () => {
      const searchHeading = screen.getByRole("heading", {
        name: "Search",
        level: 2,
      });

      expect(searchHeading).toBeInTheDocument();
    });

    test("Then it should display beer cards for each beer in the list", () => {
      mockListOfBeers.forEach((beer) => {
        expect(
          screen.getByRole("heading", { name: beer.name, level: 3 }),
        ).toBeInTheDocument();
      });
    });
  });

  describe("When the user types `Ale` in the name input and the Search button is clicked", () => {
    test("Then it should call refetch", () => {
      const mockRefetch = vi.fn();
      (useGetBeers as Mock).mockReturnValue({
        beers: mockListOfBeers,
        isLoading: false,
        isFetching: false,
        refetch: mockRefetch,
      });

      render(<SearchContainer />);

      const inputNameElement = screen.getByRole("textbox", {
        name: "Beer name",
      });
      fireEvent.change(inputNameElement, { target: { value: "Ale" } });

      const searchButton = screen.getByRole("button", { name: "Search" });
      fireEvent.click(searchButton);

      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  describe("When the useGetBeers hook is loading", () => {
    beforeEach(() => {
      (useGetBeers as Mock).mockReturnValue({
        isLoading: true,
        isFetching: false,
        refetch: vi.fn(),
      });

      render(<SearchContainer />);
    });

    test("Then it should display a loading indicator", () => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("When the useGetBeers hook returns isError set to true", () => {
    test("Then it should display an error message", () => {
      (useGetBeers as Mock).mockReturnValueOnce({
        isError: true,
        refetch: vi.fn(),
      });
      const errorMessageText = "Something went wrong, please try again later!";

      render(<SearchContainer />);

      const errorMessage = screen.getByText(errorMessageText);

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
