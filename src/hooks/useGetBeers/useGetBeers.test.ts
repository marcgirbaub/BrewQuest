import { describe, expect, vi, Mock, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import useGetBeers from "./useGetBeers";
import {
  mockBeerResponseNoDescription,
  mockBeersResponse,
  mockListOfThreeBeers,
} from "../../mocks/beerMocks";
import { BeersStructure } from "../../types/types";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

const mockUseQuery = useQuery as Mock;

describe("Given the useGetBeers hook", () => {
  describe("When called and the useQuery return is Loading true", () => {
    test("Then it should return an object with a loading property set to true", () => {
      mockUseQuery.mockReturnValue({
        isLoading: true,
        isError: false,
        data: undefined,
        error: null,
        isFetching: false,
        isSuccess: false,
        refetch: vi.fn(),
      });

      const {
        result: {
          current: { isLoading },
        },
      } = renderHook(() => useGetBeers());

      expect(isLoading).toBe(true);
    });
  });

  describe("When the useQuery successfully returns a list of three beers", () => {
    test("Then it should return a list of three beers with the formatted properties", () => {
      mockUseQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: mockBeersResponse,
        error: null,
        isFetching: false,
        isSuccess: true,
        refetch: vi.fn(),
      });
      const expectedBeers: BeersStructure = mockListOfThreeBeers;

      const {
        result: {
          current: { beers },
        },
      } = renderHook(() => useGetBeers());

      expect(beers).toEqual(expectedBeers);
    });
  });

  describe("When the useQuery fails and returns an error", () => {
    test("Then it should return the property isError set to true and an error message", () => {
      const expectedError = new Error("An error has occurred");

      mockUseQuery.mockReturnValue({
        isLoading: false,
        isError: true,
        data: undefined,
        error: expectedError,
        isFetching: false,
        isSuccess: false,
        refetch: vi.fn(),
      });

      const {
        result: {
          current: { isError, error },
        },
      } = renderHook(() => useGetBeers());

      expect(isError).toBe(true);
      expect(error).toEqual(error);
    });
  });

  describe("When the useQuery successfully returns a list of four beers but one of them does not have description", () => {
    test("Then it should return a list of three beers with the formatted properties, excluding the beer with no description", () => {
      mockUseQuery.mockReturnValue({
        isLoading: false,
        isError: false,
        data: [...mockBeersResponse, mockBeerResponseNoDescription],
        error: null,
        isFetching: false,
        isSuccess: true,
        refetch: vi.fn(),
      });
      const expectedBeers: BeersStructure = mockListOfThreeBeers;

      const {
        result: {
          current: { beers },
        },
      } = renderHook(() => useGetBeers());

      expect(beers).toEqual(expectedBeers);
    });
  });
});
