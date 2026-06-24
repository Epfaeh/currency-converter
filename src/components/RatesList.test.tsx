// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import RatesList from './RatesList'
import { czk } from '../../lib/format'
import { USD, JPY } from '../test/fixtures'

const rates = [USD, JPY]

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
    expect(jpy).toContain(czk.format(14.823))
  })
})
