import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const RandomBeerContainerStyled = styled(Paper)`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    padding: 2rem;
  }
`;

export default RandomBeerContainerStyled;
