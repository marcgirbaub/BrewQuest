import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const BeerCardStyled = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }

  .beer-card {
    &__image {
      min-width: 100px;
      display: flex;
      justify-content: center;

      & > img {
        object-fit: contain;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    @media only screen and (min-width: ${breakpoints.sm}px) {
      align-items: flex-start;
    }

    &__description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: justify;
    }

    &__name {
      text-align: center;
    }
  }
`;

export default BeerCardStyled;
