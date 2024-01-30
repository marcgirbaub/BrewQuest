import styled from "@emotion/styled";
import { breakpoints } from "../../styles/breakpoints";

const FiltersStyled = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;

  .inputs {
    display: flex;
    gap: 1rem;
    flex-direction: column;

    @media only screen and (min-width: ${breakpoints.sm}px) {
      flex-direction: row;
    }

    &__name,
    &__date {
      width: 100%;

      @media only screen and (min-width: ${breakpoints.sm}px) {
        max-width: 300px;
      }
    }
  }
`;

export default FiltersStyled;
