import { ReactElement } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BeerStructure } from "../../types/types";
import beerImagePlaceholder from "../../assets/beer-placeholder.png";
import BeerCardStyled from "./BeerCardStyled";
import { useFavorutiBeersStore } from "../../store/favouriteBeers/favouriteBeers";

interface BeerCardProps {
  beer: BeerStructure;
}

const BeerCard = ({ beer }: BeerCardProps): ReactElement => {
  const { image_url, name, description } = beer;

  const { getIsFavouriteBeer, toggleFavouriteBeer } = useFavorutiBeersStore();

  const isFavourite = getIsFavouriteBeer(beer.id);

  return (
    <BeerCardStyled elevation={2}>
      <div className="beer-card__image">
        <img
          src={image_url ?? beerImagePlaceholder}
          alt={image_url ? `${name} beer` : "Beer image not available"}
          height={100}
          width={50}
        />
      </div>
      <div className="beer-card__info info">
        <div className="info__container">
          <h3 className="info__name">{name}</h3>
          <button
            onClick={() => {
              toggleFavouriteBeer(beer);
            }}
          >
            {isFavourite ? (
              <FavoriteIcon fontSize="large" color="primary" />
            ) : (
              <FavoriteBorderIcon fontSize="large" color="primary" />
            )}
          </button>
        </div>
        <p className="info__description">{description}</p>
      </div>
    </BeerCardStyled>
  );
};

export default BeerCard;
