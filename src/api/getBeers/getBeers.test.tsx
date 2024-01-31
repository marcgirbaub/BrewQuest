import { describe, test, expect, beforeEach } from "vitest";
import getBeers from "./getBeers";
import { mockBeersResponse } from "../../mocks/beerMocks";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

describe("Given a getBeers function", () => {
  describe("When called", () => {
    test("Then it should return a list of beers if the request is successful", async () => {
      const expectedListOfBeers = mockBeersResponse;

      const beers = await getBeers();

      expect(beers).toEqual(expectedListOfBeers);
    });
  });

  describe("When called and the request fails", () => {
    beforeEach(() => {
      server.resetHandlers(...errorHandlers);
    });

    test("Then it should throw an error", async () => {
      await expect(getBeers()).rejects.toThrow(
        "Request failed with status code 500",
      );
    });
  });
});
