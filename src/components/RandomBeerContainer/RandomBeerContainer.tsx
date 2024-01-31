import { ReactElement, useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import RandomBeer from "../RandomBeer/RandomBeer";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";
import RandomBeerContainerStyled from "./RandomBeerContainerStyled";
import { BeersStructure } from "../../types/types";
import RandomBeerSkeleton from "../RandomBeerSkeleton/RandomBeerSkeleton";
import beerImagePlaceholder from "../../assets/beer-placeholder.png";
import CustomAlert from "../CustomAlert/CustomAlert";

const beersPerPage = 5;
const randomBeerIndex = 0;
const numberOfApiBeers = 325;
const maxNumberOfPages = Math.ceil(numberOfApiBeers / beersPerPage);
const firstRandomPage = Math.floor(Math.random() * maxNumberOfPages) + 1;
const abvParameter = 1;

const BeerErrorFeedback = ({
  errorMessage,
}: {
  errorMessage: string;
}): ReactElement => {
  return (
    <>
      <img
        src={beerImagePlaceholder}
        alt="Beer not found"
        height={200}
        width={100}
      />
      <CustomAlert type="error" message={errorMessage} />
    </>
  );
};

const RandomBeerContainer = (): ReactElement => {
  const [randomBeers, setRandomBeers] = useState<BeersStructure | null>(null);
  const [pageState, setPageState] = useState({
    currentPage: firstRandomPage,
    requestedPages: [firstRandomPage],
  });
  const [nonAlcoholicBeerIndex, setNonAlcoholicBeerIndex] = useState<number>(0);

  const { beers, isLoading, refetch, isFetching, isError } = useGetBeers({
    page: pageState.currentPage,
    per_page: beersPerPage,
  });

  const {
    beers: nonAlcoholicBeers,
    isFetching: isNonAlcoholicFetching,
    isError: isNonAlcoholicError,
  } = useGetBeers({
    abv_lt: abvParameter,
  });

  useEffect(() => {
    if (beers) {
      setRandomBeers(beers);
    }
  }, [beers]);

  useEffect(() => {
    if (isError) {
      setRandomBeers([]);
    }
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [pageState.currentPage, refetch]);

  const handleAnotherBeer = useCallback(() => {
    if (randomBeers && randomBeers.length > 1) {
      setRandomBeers((prevBeers) => prevBeers!.slice(randomBeerIndex + 1));
    } else {
      setPageState((prevState) => {
        let newPage;

        if (prevState.requestedPages.length === maxNumberOfPages) {
          return {
            ...prevState,
            currentPage: firstRandomPage,
            requestedPages: [firstRandomPage],
          };
        }

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

  const handleNonAlcoholicBeer = useCallback(() => {
    if (nonAlcoholicBeers?.length) {
      setRandomBeers([nonAlcoholicBeers[nonAlcoholicBeerIndex]]);
      setNonAlcoholicBeerIndex((prevIndex) =>
        prevIndex + 1 === nonAlcoholicBeers.length ? 0 : prevIndex + 1,
      );
    } else {
      setRandomBeers([]);
    }
  }, [nonAlcoholicBeers, nonAlcoholicBeerIndex]);

  const isLoadingOrFetching = isLoading || isFetching || isNonAlcoholicFetching;
  const hasBeers = randomBeers?.length && !isLoadingOrFetching;
  const isErrorAndNoBeers = isError && !hasBeers;
  const isNonAlcoholicErrorOrNoBeers =
    isNonAlcoholicError ||
    (!nonAlcoholicBeers?.length && !hasBeers && !isLoadingOrFetching);
  const hasBeersAndNotLoading = hasBeers === true;

  return (
    <RandomBeerContainerStyled elevation={3}>
      {isErrorAndNoBeers ? (
        <BeerErrorFeedback errorMessage="Something went wrong, please try again." />
      ) : (
        <>
          {isNonAlcoholicErrorOrNoBeers && (
            <BeerErrorFeedback errorMessage="Something went wrong with fetching non-alcoholic beer, please try again." />
          )}
          {isLoadingOrFetching && <RandomBeerSkeleton />}
          {hasBeersAndNotLoading && (
            <RandomBeer beer={randomBeers[randomBeerIndex]} />
          )}
        </>
      )}
      <div className="actions">
        <Button
          variant="contained"
          onClick={handleAnotherBeer}
          disabled={isLoadingOrFetching}
        >
          Another Beer
        </Button>
        <Button
          variant="outlined"
          disabled={isLoadingOrFetching}
          onClick={handleNonAlcoholicBeer}
        >
          Random non alcoholic Beer
        </Button>
      </div>
    </RandomBeerContainerStyled>
  );
};

export default RandomBeerContainer;
