import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { trashyBlondeBeerMock } from "../../mocks/beerMocks";
import BeerCard from "./BeerCard";

describe("Given a BeerCard component", () => {
  describe("When it recieves the Trashy Blonde beer", () => {
    beforeEach(() => {
      render(<BeerCard beer={trashyBlondeBeerMock} />);
    });

    test("Then it should display a title heading with its name `Buzz`", () => {
      const beerName = trashyBlondeBeerMock.name;

      const nameHeading = screen.getByRole("heading", {
        name: beerName,
        level: 3,
      });

      expect(nameHeading).toBeInTheDocument();
    });

    test("Then it should display a paragraph with its description", () => {
      const beerDescription = trashyBlondeBeerMock.description;

      const descriptionParagraph = screen.getByText(beerDescription);

      expect(descriptionParagraph).toBeInTheDocument();
    });

    test("Then it should display an image with an alt text equal to `Buzz berr`", () => {
      const beerName = trashyBlondeBeerMock.name;

      const beerImage = screen.getByRole("img", { name: `${beerName} beer` });

      expect(beerImage).toBeInTheDocument();
    });
  });
});
