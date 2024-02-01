import { ReactElement, useCallback, useState } from "react";
import dayjs from "dayjs";
import Filters from "../Filters/Filters";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";
import { CircularProgress } from "@mui/material";
import SearchContainerStyled from "./SearchContainerStyled";
import BeerList from "../BeerList/BeerList";
import CustomAlert from "../CustomAlert/CustomAlert";

export type BeerFiltersType = "name" | "date";

export interface BeerFiltersState {
  type: BeerFiltersType;
  value: string | null;
}

const SearchContainer = (): ReactElement => {
  const [filters, setFilters] = useState<BeerFiltersState>({
    type: "name",
    value: null,
  });

  const [nameInputError, setNameInputError] = useState<string | null>(null);

  const queryParameters =
    filters.type === "name"
      ? { beer_name: filters.value }
      : { brewed_before: filters.value };

  const { beers, isFetching, isLoading, refetch, isError } =
    useGetBeers(queryParameters);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^[a-zA-Z0-9- ]*$/.test(value);

    if (isValid) {
      setNameInputError(null);
      setFilters({
        type: "name",
        value: value,
      });
    } else {
      setNameInputError(
        "Only letters, numbers, spaces and hyphens are allowed.",
      );
    }
  };

  const handleDateChange = (value: string | null) => {
    if (value && dayjs(value).isValid()) {
      setFilters({
        type: "date",
        value: dayjs(value).format("MM-YYYY"),
      });
    }
  };

  const handleSwitchFilters = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        value: null,
        type: event.target.value as BeerFiltersType,
      });
    },
    [],
  );

  const handleSearch = () => {
    refetch();
  };

  const isLoadingOrFetching = isLoading || isFetching;
  const areFiltersEmpty = !filters.value;

  const areNoBeersFound =
    !isError && beers?.length === 0 && !areFiltersEmpty && !isLoadingOrFetching;

  return (
    <SearchContainerStyled>
      <h2>Search</h2>
      <Filters
        filters={filters}
        isLoadingOrFetching={isLoadingOrFetching}
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleSearch={handleSearch}
        handleSwitchFilters={handleSwitchFilters}
        isSubmitDisabled={areFiltersEmpty}
        nameInputError={nameInputError}
      />
      {isLoadingOrFetching && <CircularProgress sx={{ alignSelf: "center" }} />}
      {isError && (
        <CustomAlert
          type="error"
          message="Something went wrong, please try again later!"
        />
      )}
      {areNoBeersFound && (
        <CustomAlert
          type="info"
          message="No beers found with your search criteria."
        />
      )}
      {beers && <BeerList beers={beers} />}
    </SearchContainerStyled>
  );
};

export default SearchContainer;
