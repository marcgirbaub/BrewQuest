import { ReactElement } from "react";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RandomBeerContainer from "./components/RandomBeerContainer/RandomBeerContainer";
import { breakpoints } from "./styles/breakpoints";

const App = (): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <Box
          sx={{
            maxWidth: breakpoints.lg,
            padding: "1rem",
            margin: "auto",
          }}
        >
          <RandomBeerContainer />
        </Box>
      </CssBaseline>
    </QueryClientProvider>
  );
};

export default App;
