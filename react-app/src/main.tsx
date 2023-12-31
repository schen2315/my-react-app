import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./components/Rawg/Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import routes from "./components/Rawg/Router/routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.initialColorMode} />
        {/* <App /> */}
        <RouterProvider router={routes} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
