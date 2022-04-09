// my-theme.ts
import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const darkTheme: DefaultTheme = {
  accent: "#0095f6",
  bgColor: "#000",
  fontColor: "white",
  borderColor: "rgb(219, 219, 219)",
};

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }
  body { 
    background-color: ${(props) => props.theme?.bgColor};
    font-size: 15px;
    color: ${(props) => props.theme.fontColor};
  }

  input { 
    all: unset;
  }

  a { 
    text-decoration: none;
  }
`;
