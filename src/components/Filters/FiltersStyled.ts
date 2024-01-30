import styled from "@emotion/styled";
import { breakpoints } from "../../styles/breakpoints";

const FiltersStyled = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
    align-items: center;
  }

  .inputs {
    display: flex;
    gap: 1rem;
    flex-direction: column;

    @media only screen and (min-width: ${breakpoints.sm}px) {
      flex-direction: row-reverse;
    }

    &__name,
    &__date {
      width: 100%;

      @media only screen and (min-width: ${breakpoints.sm}px) {
        max-width: 300px;
      }
    }
  }

  .search-button {
    max-height: 42px;
  }
`;

export default FiltersStyled;
