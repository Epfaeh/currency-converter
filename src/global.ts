import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`
