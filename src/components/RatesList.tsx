import type { Rate } from '../../lib/types'
import { czk } from '../../lib/format'
import { Card, Table, NumTh, Num } from './ui'

interface RatesListProps {
  date: string
  rates: Rate[]
}

export function RatesList({ date, rates }: RatesListProps) {
  return (
    <Card>
      <h2>Rates as of {date}</h2>
      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Currency</th>
            <NumTh>Amount</NumTh>
            <NumTh>Rate</NumTh>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.code}>
              <td>{rate.code}</td>
              <td>{rate.currency}</td>
              <Num>{rate.amount}</Num>
              <Num>{czk.format(rate.rate)}</Num>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
