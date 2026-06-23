import { useRates } from './hooks/useRates'
import RatesList from './components/RatesList'
import Converter from './components/Converter'

function App() {
  const { data, isPending, isError } = useRates()

  if (isPending) return <p>Loading rates…</p>
  if (isError) return <p>Could not load exchange rates. Please try again later.</p>

  return (
    <div>
      <h1>CNB exchange rates</h1>
      <Converter rates={data.rates} />
      <RatesList date={data.date} rates={data.rates} />
    </div>
  )
}

export default App
