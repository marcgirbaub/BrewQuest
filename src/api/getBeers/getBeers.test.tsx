import { describe, test, expect } from "vitest";
import getBeers from "./getBeers";
import { mockBeersResponse } from "../../mocks/beerMocks";

describe("Given a getBeers function", () => {
  describe("When called with no params", () => {
    test("Then it should return a list of beers if the request is successful", async () => {
      const expectedListOfBeers = mockBeersResponse;

      const beers = await getBeers();

      expect(beers).toEqual(expectedListOfBeers);
    });
  });
});
