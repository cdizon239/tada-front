import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   body {
     background: ${({ theme }) => theme.background};
     color: ${({ theme }) => theme.color};
     transition: all 0.50s linear; 
     font-family: 'Varela Round';
     vertical-align: middle;

  }
  .icon {
    margin: 5px;
  }

  button {
    margin: 0.5em 0;
  }

  h1 {
    font-weight: bold;
  }

  #logoTitle {
    font-weight: 900;
    font-size: 30px;
  }

`;

export default GlobalStyles;