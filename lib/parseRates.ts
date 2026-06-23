import { z } from 'zod';
import type { Rate, RatesData } from './types';

const rowSchema = z.tuple([
  z.string(),
  z.string(),
  z.coerce.number(),
  z.string(),
  z.coerce.number(),
]);

export function parseRates(raw: string): RatesData {
  const lines = raw.trim().split('\n');

  const headerMatch = lines[0].match(/^(.+?)\s+#(\d+)$/);
  const date = headerMatch?.[1].trim() ?? '';
  const sequence = parseInt(headerMatch?.[2] ?? '0', 10);

  const rates: Rate[] = [];
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const result = rowSchema.safeParse(line.split('|'));
    if (!result.success) continue;

    const [country, currency, amount, code, rate] = result.data;
    rates.push({ country, currency, amount, code, rate });
  }

  return { date, sequence, rates };
}
