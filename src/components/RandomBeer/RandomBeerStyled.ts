import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const RandomBeerStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    align-items: flex-start;
    gap: 1.5rem;
  }

  .beer {
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 1rem;

      @media only screen and (min-width: ${breakpoints.sm}px) {
        flex-direction: row;
        gap: 2rem;
        align-items: flex-start;
      }
    }

    &__details {
      display: "flex";
      flex-direction: "column";
      gap: "4px";
      flex: 1;
    }

    &__image {
      height: 200px;
      border-radius: 0.5rem;
      object-fit: contain;
      align-self: center;
    }

    &__name {
      text-align: center;
    }
  }

  .details {
    &__description {
      text-align: justify;
    }

    &__info {
      display: flex;
      justify-content: space-between;

      &-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-style: italic;
      }
    }
  }
`;

export default RandomBeerStyled;
