import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line
export default createGlobalStyle`
  :root {
    --red: #c10;
    --green: #383;
    --primary-color: #fff;
    --primary-bg-color: #1890ff;
    --border-color: #d9d9d9;
    --hover-color: #40a9ff;

    --size-1: 8px;
    --size-half: calc(var(--size-1) * 0.5);
    --size-2: calc(var(--size-1) * 2);
    --size-3: calc(var(--size-1) * 3);
  }

  body {
    font-size: 14px;
    font-family: "Helvetica Neue";
    color: rgba(0,0,0,0.65);
    margin: 0;
  }

  // * {
  //   color: #fff !important;
  //   background: #fff !important;
  // }
`;
