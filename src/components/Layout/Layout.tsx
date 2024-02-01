import { Box } from "@mui/material";
import { ReactElement } from "react";
import Header from "../Header/Header";
import { breakpoints } from "../../styles/breakpoints";
import RandomBeerContainer from "../RandomBeerContainer/RandomBeerContainer";
import SearchContainer from "../SearchContainer/SearchContainer";

const Layout = (): ReactElement => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          maxWidth: breakpoints.xl,
          padding: "32px 16px",
          margin: "auto",
          marginTop: "70px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <RandomBeerContainer />
        <SearchContainer />
      </Box>
    </Box>
  );
};

export default Layout;
