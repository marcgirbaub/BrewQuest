import { fireEvent, render, screen } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Filters from "./Filters";

describe("Given a Filters component", () => {
  const handleDateChange = vi.fn();
  const handleNameChange = vi.fn();
  const handleSearch = vi.fn();
  const handleFiltersChange = vi.fn();
  const setInputError = vi.fn();
  const searchButtonAriaLabel = "Press to search";
  const beerNameLabelText = "Beer name";
  const brewedBeforeLabelText = "Brewed before";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When rendered", () => {
    test("Then it should show a button with the test `Search`", () => {
      render(
        <Filters
          filters={{ type: "name", value: "" }}
          isSubmitDisabled={false}
          handleDateChange={handleDateChange}
          handleNameChange={handleNameChange}
          handleSearch={handleSearch}
          handleFiltersChange={handleFiltersChange}
          inputError={null}
          setInputError={setInputError}
        />,
      );

      const buttonElement = screen.getByRole("button", {
        name: searchButtonAriaLabel,
      });

      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe("When it receives isSubmitDisabled as true", () => {
    test("Then it should disable the button", () => {
      render(
        <Filters
          filters={{ type: "name", value: "" }}
          isSubmitDisabled={true}
          handleDateChange={handleDateChange}
          handleNameChange={handleNameChange}
          handleSearch={handleSearch}
          handleFiltersChange={handleFiltersChange}
          inputError={null}
          setInputError={setInputError}
        />,
      );

      const buttonElement = screen.getByRole("button", {
        name: searchButtonAriaLabel,
      });

      expect(buttonElement).toBeDisabled();
    });
  });

  describe("When it receives the fitlers.type as `name`", () => {
    test("Then it should show the name input", () => {
      render(
        <Filters
          filters={{ type: "name", value: "" }}
          isSubmitDisabled={false}
          handleDateChange={handleDateChange}
          handleNameChange={handleNameChange}
          handleSearch={handleSearch}
          handleFiltersChange={handleFiltersChange}
          inputError={null}
          setInputError={setInputError}
        />,
      );

      const inputNameElement = screen.getByRole("textbox", {
        name: beerNameLabelText,
      });

      expect(inputNameElement).toBeInTheDocument();
    });
  });

  describe("When it receives the fitlers.type as `date`", () => {
    test("Then it should show the date input", () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Filters
            filters={{ type: "date", value: "" }}
            isSubmitDisabled={false}
            handleDateChange={handleDateChange}
            handleNameChange={handleNameChange}
            handleSearch={handleSearch}
            handleFiltersChange={handleFiltersChange}
            inputError={null}
            setInputError={setInputError}
          />
        </LocalizationProvider>,
      );

      const inputDateElement = screen.getByRole("textbox", {
        name: brewedBeforeLabelText,
      });

      expect(inputDateElement).toBeInTheDocument();
    });
  });

  describe("When the user writes on the name input", () => {
    test("Then it should call the handleNameChange function", () => {
      render(
        <Filters
          filters={{ type: "name", value: "" }}
          isSubmitDisabled={false}
          handleDateChange={handleDateChange}
          handleNameChange={handleNameChange}
          handleSearch={handleSearch}
          handleFiltersChange={handleFiltersChange}
          inputError={null}
          setInputError={setInputError}
        />,
      );

      const inputNameElement = screen.getByRole("textbox", {
        name: beerNameLabelText,
      });

      fireEvent.change(inputNameElement, { target: { value: "test" } });

      expect(handleNameChange).toHaveBeenCalled();
    });
  });

  describe("When the user clicks on the search button", () => {
    test("Then it should call the handleSearch function", () => {
      render(
        <Filters
          filters={{ type: "name", value: "" }}
          isSubmitDisabled={false}
          handleDateChange={handleDateChange}
          handleNameChange={handleNameChange}
          handleSearch={handleSearch}
          handleFiltersChange={handleFiltersChange}
          inputError={null}
          setInputError={setInputError}
        />,
      );

      const buttonElement = screen.getByRole("button", {
        name: searchButtonAriaLabel,
      });

      fireEvent.click(buttonElement);

      expect(handleSearch).toHaveBeenCalled();
    });
  });
});
