import beers from "../fixtures/beers.json";
import nonAlcoholicBeer from "../fixtures/non-alcoholic-beer.json";
import buzz from "../fixtures/buzz.json";

const apiUrl = "https://api.punkapi.com/v2/beers";
const anotherBeerText = "Another Beer";
const randomNonAlcoholicBeerText = "Random non alcoholic Beer";

describe("When navigating to the home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Then it should display a heading with the name `BrewQuest`", () => {
    const expectedHeading = "BrewQuest";
    cy.get("h1").should("contain", expectedHeading);
  });

  describe("And the API returns a list of random beers", () => {
    beforeEach(() => {
      cy.intercept("GET", `${apiUrl}*`, { fixture: "beers.json" });
    });

    it("Then it should show the name of the first random beer returned by the API", () => {
      cy.get("h2.beer__name").should("contain", beers[0].name);
    });

    it("After clicking the `Another Beer` button, it should show the name of the next random beer in the list returned by the API", () => {
      cy.get(`button:contains(${anotherBeerText})`).click();

      cy.get("h2.beer__name").should("contain", beers[1].name);
    });
  });

  describe("And the user clicks on the `Random non alcoholic Beer` button", () => {
    it("Then it should show the name of the random non alcoholic beer returned by the API", () => {
      cy.intercept("GET", `${apiUrl}?abv_lt=1`, {
        fixture: "non-alcoholic-beer.json",
      });
      cy.get(`button:contains(${randomNonAlcoholicBeerText})`).click();

      cy.get("h2.beer__name").should("contain", nonAlcoholicBeer[0].name);
    });
  });

  describe("And the user writes `Buzz` and clicks on the `Search` button", () => {
    it("Then it should show the name of the beer `Buzz`", () => {
      cy.intercept("GET", `${apiUrl}?beer_name=buzz`, {
        fixture: "buzz.json",
      });

      cy.get('[data-testid="beer-name-input"]').type("Buzz");
      cy.get('[data-testid="search-button"]').click();

      cy.get("h3.info__name").should("contain", buzz[0].name);
    });
  });

  describe("And the user writes `asd` and clicks on the `Search` button", () => {
    it("Then it should show the message `No results found` if no beers are returned from the API", () => {
      cy.intercept("GET", `${apiUrl}?beer_name=asd`, {
        statusCode: 200,
        body: [],
      });
      const expectedMessage = "No beers found with your search criteria.";

      cy.get('[data-testid="beer-name-input"]').type("asd");
      cy.get('[data-testid="search-button"]').click();

      cy.contains(expectedMessage).should("exist");
    });

    it("Then it should show an error message if the API return an error code", () => {
      cy.intercept("GET", `${apiUrl}?beer_name=asd`, { statusCode: 500 }).as(
        "getBeer",
      );
      const expectedErrorMessage =
        "Something went wrong, please try again later!";

      cy.get('[data-testid="beer-name-input"]').type("asd");
      cy.get('[data-testid="search-button"]').click();

      cy.wait("@getBeer");
      cy.wait("@getBeer");
      cy.wait("@getBeer");
      cy.wait("@getBeer");

      cy.contains(expectedErrorMessage).should("exist");
    });
  });
});
