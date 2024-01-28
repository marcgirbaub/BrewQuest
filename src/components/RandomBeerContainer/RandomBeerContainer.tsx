import { ReactElement, useCallback, useEffect, useState } from "react";
import RandomBeer from "../RandomBeer/RandomBeer";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";
import RandomBeerContainerStyled from "./RandomBeerContainerStyled";
import { BeersStructure } from "../../types/types";
import { Button } from "@mui/material";
import RandomBeerSkeleton from "../RandomBeerSkeleton/RandomBeerSkeleton";

const beersPerPage = 5;
const randomBeerIndex = 0;
const numberOfApiBeers = 325;
const maxNumberOfPages = numberOfApiBeers / beersPerPage;
const firstRandomPage = Math.floor(Math.random() * maxNumberOfPages) + 1;

const RandomBeerContainer = (): ReactElement => {
  const [randomBeers, setRandomBeers] = useState<BeersStructure | null>(null);
  const [pageState, setPageState] = useState({
    currentPage: firstRandomPage,
    requestedPages: [firstRandomPage],
  });

  const { beers, isLoading, refetch, isFetching } = useGetBeers({
    page: pageState.currentPage,
    per_page: beersPerPage,
  });

  useEffect(() => {
    if (beers) {
      setRandomBeers(beers);
    }
  }, [beers]);

  useEffect(() => {
    refetch();
  }, [pageState.currentPage, refetch]);

  const handleAnotherBeer = useCallback(() => {
    if (randomBeers && randomBeers.length > 1) {
      setRandomBeers((prevBeers) => prevBeers!.slice(randomBeerIndex + 1));
    } else {
      setPageState((prevState) => {
        let newPage;

        do {
          newPage = Math.floor(Math.random() * maxNumberOfPages) + 1;
        } while (
          prevState.requestedPages.includes(newPage) ||
          newPage === prevState.currentPage
        );

        return {
          ...prevState,
          currentPage: newPage,
          requestedPages: [...prevState.requestedPages, newPage],
        };
      });
    }
  }, [randomBeers]);

  const isDisabled = isFetching || isLoading;

  return (
    <RandomBeerContainerStyled elevation={3}>
      {isLoading || isFetching ? (
        <RandomBeerSkeleton />
      ) : (
        randomBeers?.length && (
          <RandomBeer beer={randomBeers[randomBeerIndex]} />
        )
      )}
      <div className="actions">
        <Button
          variant="contained"
          onClick={handleAnotherBeer}
          disabled={isDisabled}
        >
          Another Beer
        </Button>
        <Button variant="outlined" disabled={isDisabled}>
          Random non alcoholic Beer
        </Button>
      </div>
    </RandomBeerContainerStyled>
  );
};

export default RandomBeerContainer;
