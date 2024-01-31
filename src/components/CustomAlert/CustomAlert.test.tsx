import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomAlert from "./CustomAlert";

describe("Given a CustomAlert component", () => {
  describe("When it receives an error type and a message", () => {
    test("Then it should show an alert with the error message", () => {
      const errorMessage = "Something went wrong, please try again later!";

      render(<CustomAlert type="error" message={errorMessage} />);
      const alertElement = screen.getByRole("alert", { name: errorMessage });

      expect(alertElement).toBeInTheDocument();
    });
  });
});
