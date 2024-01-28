import { ReactElement } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = (): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline></CssBaseline>
    </QueryClientProvider>
  );
};

export default App;
