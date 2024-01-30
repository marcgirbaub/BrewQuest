import { ReactElement } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeContextProvider>
          <Header />
          <Box
            sx={{
              maxWidth: breakpoints.xl,
              padding: "1rem",
              margin: "auto",
              marginTop: "70px",
            }}
          >
            <RandomBeerContainer />
          </Box>
        </ThemeContextProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
