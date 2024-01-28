import { ReactElement, useEffect, useState } from "react";
import RandomBeer from "../RandomBeer/RandomBeer";
import useGetBeers from "../../hooks/useGetBeers/useGetBeers";
import RandomBeerContainerStyled from "./RandomBeerContainerStyled";
import { BeersStructure } from "../../types/types";

const RandomBeerContainer = (): ReactElement => {
  const [randomBeers, setRandomBeers] = useState<BeersStructure | null>(null);

  const { beers, isLoading } = useGetBeers();

  useEffect(() => {
    if (beers) {
      setRandomBeers(() => beers);
    }
  }, [beers]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <RandomBeerContainerStyled elevation={3}>
      {randomBeers && <RandomBeer beer={randomBeers![0]} />}
    </RandomBeerContainerStyled>
  );
};

export default RandomBeerContainer;
