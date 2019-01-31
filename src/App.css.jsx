import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line
export default createGlobalStyle`
  :root {
    --red: #c10;
    --green: #383;
    --border-color: #ddd;

    --size-1: 8px;
    --size-half: calc(var(--size-1) * 0.5);
  }

  body {
    font-family: "Helvetica Neue";
  }

  // * {
  //   color: #fff !important;
  //   background: #fff !important;
  // }
`;
