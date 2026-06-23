import { useQuery } from '@tanstack/react-query'
import type { RatesData } from '../../lib/types'

export function useRates() {
  return useQuery<RatesData>({
    queryKey: ['rates'],
    queryFn: async () => {
      const res = await fetch('/api/rates')
      if (!res.ok) throw new Error('Failed to load rates')
      return res.json() as Promise<RatesData>
    },
    // CNB publishes once per workday (~14:30 CET). 30 min keeps refetches rare
    // while letting an open tab pick up the new fixing soon after it's published.
    staleTime: 1000 * 60 * 30,
  })
}
