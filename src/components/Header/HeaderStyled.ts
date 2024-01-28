import styled from "@emotion/styled";
import { AppBar } from "@mui/material";
import { breakpoints } from "../../styles/breakpoints";

const HeaderStyled = styled(AppBar)`
  .header {
    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin: auto;
      width: 100%;
      max-width: ${breakpoints.xl}px;
    }

    &__title {
      font-size: 1.5rem;
    }

    &__dark-mode {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export default HeaderStyled;
