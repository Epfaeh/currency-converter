import { useRates } from './hooks/useRates'

function App() {
  const { data, isPending, isError } = useRates()

  if (isPending) return <p>Loading rates…</p>
  if (isError) return <p>Could not load exchange rates. Please try again later.</p>

  return (
    <div>
      <h1>CNB exchange rates</h1>
      <p>
        {data.date} (#{data.sequence})
      </p>
      <ul>
        {data.rates.map((rate) => (
          <li key={rate.code}>
            {rate.amount} {rate.code} ({rate.currency}) = {rate.rate} CZK
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
