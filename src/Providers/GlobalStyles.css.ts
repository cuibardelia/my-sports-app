import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin and padding */
  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  em,
  font,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  /* Set default font family and size */
  body {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 16px;
	color: #30424D;
  }

  /* Remove default list styles */
  ul,
  ol {
    list-style: none;
  }

  /* Remove default blockquote styles */
  blockquote,
  q {
    quotes: none;
  }

  /* Remove default table spacing */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Remove default button styling */
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;
