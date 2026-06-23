# CLAUDE.md

## Project
React app that fetches CZK foreign-exchange rates from the Czech National
Bank, lists them, and converts a CZK amount into a selected currency.

## Stack (hard constraints)
- Vite + React + TypeScript — NOT Next.js
- Styled Components, TanStack Query (React Query)
- Vitest + React Testing Library + MSW
- pnpm, deployed on Vercel

## Structure
- `api/rates.ts` — Vercel function at REPO ROOT (not src/). Thin: fetch CNB,
  parse, return JSON. No business logic of its own.
- `lib/parseRates.ts`, `lib/convert.ts` — pure functions.
- `lib/types.ts` — shared types, imported by both api/ and tests.
- `src/components/` — presentation.

## Domain detail (must be correct)
CNB rows: `Country|Currency|Amount|Code|Rate`. Amount is NOT always 1 —
JPY/HUF etc. are quoted per 100. Rate = CZK per `Amount` units of the
foreign currency. Conversion: foreignAmount = czk * amount / rate.
Do not normalize the rate. A test must cover an amount != 1 currency.

## How to work
- Think before coding. State assumptions; if multiple interpretations exist,
  surface them instead of silently picking. If something's unclear, ask.
- Simplest code that solves the problem — nothing speculative. No abstractions
  for single-use code, no unrequested config, no handling of impossible cases.
- Surgical changes: touch only what the request needs. Don't refactor working
  code or restyle adjacent lines. Flag unrelated dead code, don't delete it.
  Only remove orphans your own change created.
- Goal-driven: turn each task into a verifiable check and loop until it passes.
  TDD the `lib/` pure functions; the api handler is wiring, no TDD.
- For multi-step work, state a brief plan with a verify step for each.

## Project specifics
- React Query staleTime can be generous: CNB updates once per workday ~14:30 CET.
- Conversion is real-time (no submit button).

## Do NOT
- No Redux/Zustand — React Query + useState is enough.
- No multi-provider "currency service" abstraction.
- No public CORS-proxy hacks — the serverless function is the CORS fix.

## Commands
- `vercel dev` — full-stack incl. /api (NOT `vite dev`, which won't serve /api)
- `pnpm test`, `pnpm build`
