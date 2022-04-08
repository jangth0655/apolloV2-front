import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme, lightTheme } from "./theme";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }
  body { 
    background-color: #FAFAFA;
    font-size: 15px;
    color: rgb(38,38,38);
  }

  input { 
    all: unset;
  }

  a { 
    text-decoration: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
