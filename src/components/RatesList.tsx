import type { Rate } from '../../lib/types'

const czk = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' })

interface RatesListProps {
  date: string
  rates: Rate[]
}

function RatesList({ date, rates }: RatesListProps) {
  return (
    <div>
      <h2>Rates as of {date}</h2>
      <ul>
        {rates.map((rate) => (
          <li key={rate.code}>
            {rate.amount} {rate.code} ({rate.currency}) = {czk.format(rate.rate)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RatesList
