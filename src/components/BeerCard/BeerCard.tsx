import { ReactElement } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BeerStructure } from "../../types/types";
import beerImagePlaceholder from "../../assets/beer-placeholder.png";
import BeerCardStyled from "./BeerCardStyled";

interface BeerCardProps {
  beer: BeerStructure;
}

const BeerCard = ({ beer }: BeerCardProps): ReactElement => {
  return (
    <BeerCardStyled elevation={2}>
      <div className="beer-card__image">
        <img
          src={beer.image_url ?? beerImagePlaceholder}
          alt={
            beer.image_url ? `${beer.name} beer` : "Beer image not available"
          }
          height={100}
          width={50}
        />
      </div>
      <div className="beer-card__info info">
        <div className="info__container">
          <h3 className="info__name">{beer.name}</h3>
          <button>
            <FavoriteIcon fontSize="medium" color="primary" />
          </button>
        </div>
        <p className="info__description">{beer.description}</p>
      </div>
    </BeerCardStyled>
  );
};

export default BeerCard;
