// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '../test-utils'

// No vitest `globals`, so RTL's auto-cleanup isn't registered — do it explicitly
// to keep each test's render isolated.
afterEach(cleanup)
import RatesList from './RatesList'
import type { Rate } from '../../lib/types'

const USD: Rate = {
  country: 'United States',
  currency: 'dollar',
  amount: 1,
  code: 'USD',
  rate: 21.543,
}
const JPY: Rate = {
  country: 'Japan',
  currency: 'yen',
  amount: 100,
  code: 'JPY',
  rate: 14.823,
}
const rates = [USD, JPY]

// Build the expected CZK string the same way the component does, so the
// assertion is robust to locale-specific formatting.
const czk = (value: number) =>
  new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(value)

describe('RatesList', () => {
  it('renders the heading with the date', () => {
    render(<RatesList date="23 Jun 2026" rates={rates} />)
    expect(screen.getByRole('heading').textContent).toBe('Rates as of 23 Jun 2026')
  })

  it('renders one row per rate', () => {
    render(<RatesList date="23 Jun 2026" rates={rates} />)
    // +1 for the header row
    expect(screen.getAllByRole('row')).toHaveLength(rates.length + 1)
  })

  it('shows amount, code, currency and CZK rate, incl. a per-100 currency', () => {
    render(<RatesList date="23 Jun 2026" rates={rates} />)
    // Skip the header row; JPY is the second data row.
    const jpy = screen.getAllByRole('row')[2].textContent ?? ''
    expect(jpy).toContain('100')
    expect(jpy).toContain('JPY')
    expect(jpy).toContain('yen')
    expect(jpy).toContain(czk(14.823))
  })
})
