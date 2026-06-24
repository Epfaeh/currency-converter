# CZK Currency Converter

Fetches the latest Czech National Bank (CNB) foreign-exchange rates, lists them,
and converts a CZK amount into a selected currency in real time.

_Live: `<URL to be added>`_

## Tech stack

React (+ Hooks) · TypeScript · Styled Components · React Query (TanStack Query) ·
Vite · Vitest · Vercel · Vercel Functions

## Run locally

```sh
pnpm install
vercel dev      # ⚠️ NOT `vite dev` — vite won't serve the /api proxy
```

Run tests:

```sh
pnpm test
```

## Design decisions

- **Serverless function as a CORS proxy** (`api/rates.ts`). CNB restricts CORS to
  its own origin, so the browser can't fetch `daily.txt` directly — a same-origin
  proxy is required. Parsing runs server-side, so the client receives clean,
  typed JSON instead of a raw text blob.
- **The `amount` field matters.** CNB quotes some currencies per 100 units
  (e.g. JPY, HUF), so conversion is `czk * amount / rate`, **not** a naive
  `czk / rate`. The rate is never normalized.
- **Caching, two layers.** CNB publishes once per workday (~14:30 CET), so
  refetching hard is pointless: the serverless response sets `s-maxage=60` (CDN
  edge cache) and React Query uses a 30-min `staleTime` client-side.
- **Testing approach.** The pure functions (`parseRates`, `convert`) are
  unit-tested — including the amount-aware (per-100) case. The UI flow is covered
  by component tests with React Testing Library, with the API mocked via MSW.

## Assignment

> Create a simple React app (don’t use NextJS please), which:
>
> 1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.
>
>     API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
>
>     Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
>
> 2. Parses the downloaded data and clearly displays a list to the user in the UI.
>
> 3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.
>
> 4. Commit your code throughout your work and upload the resulting codebase into a Github repo.
>
> 5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).
>
> 6. Add automated tests which might be appropriate to ensure that your solution is working correctly.
>
> 7. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.
>
> Overall: Keep the code simple and the UI nice and easy to use for the user.
