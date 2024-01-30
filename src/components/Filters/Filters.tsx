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
  isLoadingOrFetching?: boolean;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (newValue: string | null) => void;
  handleSearch: () => void;
  isSubmitDisabled: boolean;
  handleSwitchFiltersType: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters = ({
  filters,
  isLoadingOrFetching,
  handleNameChange,
  handleDateChange,
  handleSearch,
  isSubmitDisabled,
  handleSwitchFiltersType,
}: FiltersProps): ReactElement => {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) return;

    handleSearch();
  };

  return (
    <FiltersStyled onSubmit={handleOnSubmit}>
      <div className="inputs">
        <RadioGroup row value={filters.type} onChange={handleSwitchFiltersType}>
          <FormControlLabel control={<Radio />} label="By name" value="name" />
          <FormControlLabel
            control={<Radio />}
            label="By brewed before"
            value="date"
          />
        </RadioGroup>
        {filters.type === "name" ? (
          <TextField
            label="Beer name"
            variant="outlined"
            placeholder="Search by beer name"
            className="inputs__name"
            onChange={handleNameChange}
          />
        ) : (
          <DatePicker
            label="Brewed before"
            views={["year", "month"]}
            value={filters.value}
            onChange={handleDateChange}
            className="inputs__date"
          />
        )}
      </div>
      <Button
        variant="contained"
        className="search-button"
        disabled={isLoadingOrFetching || isSubmitDisabled}
        onClick={handleSearch}
      >
        Search
      </Button>
    </FiltersStyled>
  );
};

export default Filters;
