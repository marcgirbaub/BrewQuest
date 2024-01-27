import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { buzzBeerMock } from "../../mocks/beerMocks";
import RandomBeer from "./RandomBeer";

describe("Given a RandomBeer component", () => {
  describe("When it recieves the Buzz beer", () => {
    beforeEach(() => {
      render(<RandomBeer beer={buzzBeerMock} />);
    });

    test("Then it should display a title heading with its name `Buzz`", () => {
      const beerName = buzzBeerMock.name;

      const nameHeading = screen.getByRole("heading", {
        name: beerName,
        level: 3,
      });

      expect(nameHeading).toBeInTheDocument();
    });

    test("Then it should display a paragraph with its description", () => {
      const beerDescription = buzzBeerMock.description;

      const descriptionParagraph = screen.getByText(beerDescription);

      expect(descriptionParagraph).toBeInTheDocument();
    });

    test("Then it should display an image with an alt text equal to `Buzz berr`", () => {
      const beerName = buzzBeerMock.name;

      const beerImage = screen.getByRole("img", { name: `${beerName} beer` });

      expect(beerImage).toBeInTheDocument();
    });
  });
});
