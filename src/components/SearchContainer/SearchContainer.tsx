import { ReactElement, useCallback, useState } from "react";
import Filters from "../Filters/Filters";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";
import { Alert, CircularProgress } from "@mui/material";
import BeerCard from "../BeerCard/BeerCard";
import SearchContainerStyled from "./SearchContainerStyled";

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

  const queryParameters =
    filters.type === "name"
      ? { beer_name: filters.value }
      : { brewed_before: filters.value };

  const { beers, isFetching, isLoading, refetch, isError } =
    useGetBeers(queryParameters);

  const isLoadingOrFetching = isLoading || isFetching;
  const areFiltersEmpty = !filters.value;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      type: "name",
      value: event.target.value,
    });
  };

  const handleDateChange = (newValue: string | null) => {
    setFilters({
      type: "date",
      value: newValue,
    });
  };

  const handleSwitchFiltersType = useCallback(
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

  return (
    <SearchContainerStyled>
      <h2>Search</h2>
      <Filters
        filters={filters}
        isLoadingOrFetching={isLoadingOrFetching}
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleSearch={handleSearch}
        handleSwitchFiltersType={handleSwitchFiltersType}
        isSubmitDisabled={areFiltersEmpty}
      />
      {isLoadingOrFetching && <CircularProgress sx={{ alignSelf: "center" }} />}
      {isError && (
        <Alert severity="error">
          Something went wrong, please try again later!
        </Alert>
      )}
      {!isError &&
        beers?.length === 0 &&
        !areFiltersEmpty &&
        !isLoadingOrFetching && (
          <Alert sx={{ width: "fit-content" }} severity="info">
            No beers found with your search criteria.
          </Alert>
        )}
      {beers && (
        <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {beers.map((beer) => (
            <li key={beer.id}>
              <BeerCard beer={beer} />
            </li>
          ))}
        </ul>
      )}
    </SearchContainerStyled>
  );
};

export default SearchContainer;
