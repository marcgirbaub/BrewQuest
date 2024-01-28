import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const RandomBeerStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    align-items: flex-start;
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
      }
    }

    &__image {
      height: 200px;
      border-radius: 0.5rem;
      object-fit: contain;
    }

    &__description {
      text-align: justify;
    }
  }
`;

export default RandomBeerStyled;
