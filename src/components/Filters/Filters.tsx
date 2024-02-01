import { ReactElement } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FiltersStyled from "./FiltersStyled";
import { BeerFiltersState } from "../SearchContainer/SearchContainer";

interface FiltersProps {
  filters: BeerFiltersState;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (newValue: string | null) => void;
  handleSearch: () => void;
  isSubmitDisabled: boolean;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string | null;
  setInputError: (value: string) => void;
}

//It could be argued that Filters component receives too many props, but, for the purpose of this project,
//this was intentional to make it easier to test. In a bigger project, we would have to consider if the component needs
//to be resused in other parts of the application, and if it does, we would refactor it to make it more reusable.

const Filters = ({
  filters,
  handleNameChange,
  handleDateChange,
  handleSearch,
  isSubmitDisabled,
  handleFiltersChange,
  inputError,
  setInputError,
}: FiltersProps): ReactElement => {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) return;

    handleSearch();
  };

  return (
    <FiltersStyled onSubmit={handleOnSubmit}>
      <RadioGroup row value={filters.type} onChange={handleFiltersChange}>
        <FormControlLabel control={<Radio />} label="By name" value="name" />
        <FormControlLabel
          control={<Radio />}
          label="Brewed before"
          value="date"
        />
      </RadioGroup>
      <div className="inputs">
        {filters.type === "name" ? (
          <TextField
            label="Beer name"
            variant="outlined"
            placeholder="Search by beer name"
            className="inputs__name"
            onChange={handleNameChange}
            error={Boolean(inputError)}
            helperText={inputError}
            size="small"
            data-testid="beer-name-input"
          />
        ) : (
          <DatePicker
            label="Brewed before"
            views={["year", "month"]}
            value={filters.value}
            onChange={handleDateChange}
            className="inputs__date"
            slotProps={{ textField: { size: "small" } }}
            onError={(error) => {
              if (error) {
                setInputError("Date is not valid");
              } else {
                setInputError("");
              }
            }}
          />
        )}
        <Button
          variant="contained"
          disabled={isSubmitDisabled}
          onClick={handleSearch}
          aria-label="Press to search"
          className="inputs__button"
          data-testid="search-button"
        >
          Search
        </Button>
      </div>
    </FiltersStyled>
  );
};

export default Filters;
