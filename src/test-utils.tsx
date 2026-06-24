/* eslint-disable react-refresh/only-export-components -- test helper, not an HMR module */
import type { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

// Styled components read from the theme, so every render under test needs a
// ThemeProvider. Re-export RTL with a render that wraps in one.
function Wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const render = (ui: ReactElement, options?: Parameters<typeof rtlRender>[1]) =>
  rtlRender(ui, { wrapper: Wrapper, ...options })

export * from '@testing-library/react'
export { render }
