import { useState } from 'react'
import type { Rate } from '../../lib/types'
import { convert } from '../../lib/convert'
import { Card, Field, Label, Input, Select, Result } from './ui'

interface ConverterProps {
  rates: Rate[]
}

function Converter({ rates }: ConverterProps) {
  const [amount, setAmount] = useState('')
  const [code, setCode] = useState(rates[0].code)

  const selectedRate = rates.find((r) => r.code === code) ?? rates[0]
  const czk = Number(amount)
  const result =
    amount === '' || Number.isNaN(czk) ? null : convert(czk, selectedRate)

  const formatted =
    result === null
      ? ''
      : new Intl.NumberFormat('cs-CZ', {
          style: 'currency',
          currency: selectedRate.code,
        }).format(result)

  return (
    <Card>
      <h2>Convert</h2>
      <Field>
        <Label htmlFor="amount">Amount in CZK</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="currency">Currency</Label>
        <Select
          id="currency"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        >
          {rates.map((rate) => (
            <option key={rate.code} value={rate.code}>
              {rate.code} — {rate.currency}
            </option>
          ))}
        </Select>
      </Field>
      <Result>{formatted}</Result>
    </Card>
  )
}

export default Converter
