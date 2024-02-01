import { ReactElement } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./store/contexts/ThemeContextProvider";
import Layout from "./components/Layout/Layout";

const App = (): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeContextProvider>
          <Layout />
        </ThemeContextProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
