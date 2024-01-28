import { ReactElement } from "react";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RandomBeerContainer from "./components/RandomBeerContainer/RandomBeerContainer";
import { breakpoints } from "./styles/breakpoints";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import Header from "./components/Header/Header";

const App = (): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Box
          sx={{
            maxWidth: breakpoints.xl,
            padding: "1rem",
            margin: "auto",
          }}
        >
          <Header />
          <div style={{ marginTop: "70px" }}>
            <RandomBeerContainer />
          </div>
        </Box>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;
