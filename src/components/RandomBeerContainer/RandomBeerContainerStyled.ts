import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const RandomBeerContainerStyled = styled(Paper)`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    padding: 2rem;
    flex-direction: row;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    @media only screen and (min-width: ${breakpoints.sm}px) {
      width: fit-content;
    }

    @media only screen and (min-width: ${breakpoints.lg}px) {
      min-width: fit-content;
    }
  }
`;

export default RandomBeerContainerStyled;
