// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '../test-utils'
import userEvent from '@testing-library/user-event'

// No vitest `globals`, so RTL's auto-cleanup isn't registered — do it explicitly
// to keep each test's render isolated.
afterEach(cleanup)
import Converter from './Converter'
import { convert } from '../../lib/convert'
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

// Build the expected string the same way the component does, so the assertion
// is robust to locale-specific formatting (cs-CZ separators, currency symbol).
const format = (value: number, code: string) =>
  new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: code }).format(value)

describe('Converter', () => {
  it('defaults the currency to the first rate and shows no result yet', () => {
    const { container } = render(<Converter rates={rates} />)
    expect((screen.getByLabelText('Currency') as HTMLSelectElement).value).toBe('USD')
    expect(container.querySelector('p')?.textContent).toBe('')
  })

  it('converts in real time using the selected rate', async () => {
    const user = userEvent.setup()
    const { container } = render(<Converter rates={rates} />)
    const output = () => container.querySelector('p')?.textContent

    await user.type(screen.getByLabelText('Amount in CZK'), '100')
    expect(output()).toBe(format(convert(100, USD), 'USD'))

    // Switching to a per-100 currency recomputes through convert()
    await user.selectOptions(screen.getByLabelText('Currency'), 'JPY')
    expect(output()).toBe(format(convert(100, JPY), 'JPY'))
  })

  it('shows nothing when the amount is cleared', async () => {
    const user = userEvent.setup()
    const { container } = render(<Converter rates={rates} />)
    const input = screen.getByLabelText('Amount in CZK')

    await user.type(input, '50')
    expect(container.querySelector('p')?.textContent).not.toBe('')

    await user.clear(input)
    expect(container.querySelector('p')?.textContent).toBe('')
  })

  it('shows a zero result for an amount of 0, not an empty string', async () => {
    const user = userEvent.setup()
    const { container } = render(<Converter rates={rates} />)

    await user.type(screen.getByLabelText('Amount in CZK'), '0')
    expect(container.querySelector('p')?.textContent).toBe(format(convert(0, USD), 'USD'))
  })

  it('converts a decimal CZK amount in real time', async () => {
    const user = userEvent.setup()
    const { container } = render(<Converter rates={rates} />)

    await user.type(screen.getByLabelText('Amount in CZK'), '100.5')
    expect(container.querySelector('p')?.textContent).toBe(format(convert(100.5, USD), 'USD'))
  })
})
