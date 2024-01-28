import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const RandomBeerSkeletonStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    align-items: flex-start;
    gap: 1.5rem;
  }

  .skeleton {
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

    &__image {
      @media only screen and (min-width: ${breakpoints.sm}px) {
        max-width: 200px;
      }
    }
  }
`;

export default RandomBeerSkeletonStyled;
