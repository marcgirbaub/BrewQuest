import { ReactElement } from "react";
import { BeerStructure } from "../../types/types";
import RandomBeerStyled from "./RandomBeerStyled";
import beerImagePlaceholder from "../../assets/beer-placeholder.png";

interface RandomBeerProps {
  beer: BeerStructure;
}

const RandomBeer = ({ beer }: RandomBeerProps): ReactElement => {
  const { name, image_url, description } = beer;

  return (
    <RandomBeerStyled component="article">
      <h3 className="beer__name">{name}</h3>
      <div className="beer__body">
        <img
          src={image_url ?? beerImagePlaceholder}
          alt={`${name} beer`}
          className="beer__image"
          height={200}
          width={100}
        />
        <p className="beer__description">{description}</p>
      </div>
    </RandomBeerStyled>
  );
};

export default RandomBeer;
