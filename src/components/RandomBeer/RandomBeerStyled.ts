import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const RandomBeerStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  @media only screen and (min-width: ${breakpoints.sm}) {
    align-items: flex-start;
  }

  .beer {
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      gap: 1rem;

      @media only screen and (min-width: ${breakpoints.sm}) {
        flex-direction: row;
      }
    }

    &__image {
      height: 200px;
      border-radius: 0.5rem;
      object-fit: contain;
    }
  }
`;

export default RandomBeerStyled;
