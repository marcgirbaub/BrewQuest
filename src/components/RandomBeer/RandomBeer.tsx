import { ReactElement } from "react";
import { BeerStructure } from "../../types/types";
import RandomBeerStyled from "./RandomBeerStyled";

interface RandomBeerProps {
  beer: BeerStructure;
}

const RandomBeer = ({ beer }: RandomBeerProps): ReactElement => {
  const { name, image_url, description } = beer;

  return (
    <RandomBeerStyled component="article">
      <h3>{name}</h3>
      <div className="beer__body">
        <img src={image_url} alt={name} className="beer__image" />
        <p>{description}</p>
      </div>
    </RandomBeerStyled>
  );
};

export default RandomBeer;
