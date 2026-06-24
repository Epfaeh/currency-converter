import { useRates } from './hooks/useRates'
import RatesList from './components/RatesList'
import Converter from './components/Converter'
import { Container, Stack, Title } from './components/ui'

function App() {
  const { data, isPending, isError } = useRates()

  if (isPending) return <Container>Loading rates…</Container>
  if (isError)
    return <Container>Could not load exchange rates. Please try again later.</Container>

  return (
    <Container>
      <Title>CNB exchange rates</Title>
      <Stack>
        <Converter rates={data.rates} />
        <RatesList date={data.date} rates={data.rates} />
      </Stack>
    </Container>
  )
}

export default App
