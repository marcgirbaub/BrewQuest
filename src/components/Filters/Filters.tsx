import { ReactElement, useState } from "react";
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
  isLoadingOrFetching?: boolean;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (newValue: string | null) => void;
  handleSearch: () => void;
  isSubmitDisabled: boolean;
  handleSwitchFiltersType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameInputError: string | null;
}

const Filters = ({
  filters,
  isLoadingOrFetching,
  handleNameChange,
  handleDateChange,
  handleSearch,
  isSubmitDisabled,
  handleSwitchFiltersType,
  nameInputError,
}: FiltersProps): ReactElement => {
  const [isDateInputError, setIsDateInputError] = useState<boolean>(false);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || nameInputError || isDateInputError) return;

    handleSearch();
  };

  const isSubmitButtonDisabled =
    Boolean(nameInputError) ||
    isLoadingOrFetching ||
    isSubmitDisabled ||
    isDateInputError;

  return (
    <FiltersStyled onSubmit={handleOnSubmit}>
      <RadioGroup row value={filters.type} onChange={handleSwitchFiltersType}>
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
            error={Boolean(nameInputError)}
            helperText={nameInputError}
            size="small"
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
                setIsDateInputError(true);
              } else {
                setIsDateInputError(false);
              }
            }}
          />
        )}
        <Button
          variant="contained"
          disabled={isSubmitButtonDisabled}
          onClick={handleSearch}
          aria-label="Press to search"
          className="inputs__button"
        >
          Search
        </Button>
      </div>
    </FiltersStyled>
  );
};

export default Filters;
