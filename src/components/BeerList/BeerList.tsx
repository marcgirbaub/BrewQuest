import { ReactElement } from "react";
import { BeersStructure } from "../../types/types";
import BeerCard from "../BeerCard/BeerCard";
import BeerListStyled from "./BeerListStyled";

interface BeersListProps {
  beers: BeersStructure;
}

const BeersList = ({ beers }: BeersListProps): ReactElement => {
  return (
    <BeerListStyled>
      {beers.map((beer) => (
        <li key={beer.id}>
          <BeerCard beer={beer} />
        </li>
      ))}
    </BeerListStyled>
  );
};

export default BeersList;
