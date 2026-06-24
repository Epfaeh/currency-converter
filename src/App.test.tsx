// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { App } from './App'
import { theme } from './theme'
import { USD, JPY } from './test/fixtures'

const ratesData = { date: '23 Jun 2026', sequence: 120, rates: [USD, JPY] }

const server = setupServer()
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderApp() {
  // retry: false so the error case fails fast instead of retrying.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>,
  )
}

describe('App', () => {
  it('shows a loading state first', () => {
    server.use(http.get('/api/rates', () => HttpResponse.json(ratesData)))
    renderApp()
    expect(screen.getByText('Loading rates…')).toBeInTheDocument()
  })

  it('renders the rates and converter on success', async () => {
    server.use(http.get('/api/rates', () => HttpResponse.json(ratesData)))
    renderApp()
    expect(await screen.findByText('Rates as of 23 Jun 2026')).toBeInTheDocument()
    expect(screen.getByText('Convert')).toBeInTheDocument()
  })

  it('shows an error message when the request fails', async () => {
    server.use(http.get('/api/rates', () => new HttpResponse(null, { status: 500 })))
    renderApp()
    expect(
      await screen.findByText(/Could not load exchange rates/),
    ).toBeInTheDocument()
  })
})
