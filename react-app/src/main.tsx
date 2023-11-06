import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./components/Rawg/Theme";
// import "bootstrap/dist/css/bootstrap.css";
// import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
