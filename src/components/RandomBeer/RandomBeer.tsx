import { ReactElement } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BeerStructure } from "../../types/types";
import RandomBeerStyled from "./RandomBeerStyled";
import beerImagePlaceholder from "../../assets/beer-placeholder.png";

interface RandomBeerProps {
  beer: BeerStructure;
}

const RandomBeer = ({ beer }: RandomBeerProps): ReactElement => {
  const { name, image_url, description, first_brewed, abv } = beer;

  return (
    <RandomBeerStyled component="article" className="beer">
      <h2 className="beer__name">{name}</h2>
      <div className="beer__body">
        <img
          src={image_url ?? beerImagePlaceholder}
          alt={image_url ? `${name} beer` : "Beer image not available"}
          className="beer__image"
          height={200}
          width={100}
        />
        <div className="beer__details details">
          <p className="details__description">{description}</p>
          <hr style={{ border: "0.5px solid lightgray", width: "100%" }} />
          <div className="details__info">
            <div className="details__info-text">
              <span>First brewed: {first_brewed}</span>
              <span>ABV: {abv}</span>
            </div>
            <button>
              <FavoriteIcon fontSize="large" color="primary" />
            </button>
          </div>
        </div>
      </div>
    </RandomBeerStyled>
  );
};

export default RandomBeer;
