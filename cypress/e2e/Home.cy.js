import beers from "../fixtures/beers.json";
import nonAlcoholicBeer from "../fixtures/non-alcoholic-beer.json";

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
    beforeEach(() => {
      cy.intercept("GET", `${apiUrl}?abv_lt=1`, {
        fixture: "non-alcoholic-beer.json",
      });
    });

    it("Then it should show the name of the random non alcoholic beer returned by the API", () => {
      cy.get(`button:contains(${randomNonAlcoholicBeerText})`).click();

      cy.get("h2.beer__name").should("contain", nonAlcoholicBeer[0].name);
    });
  });
});
