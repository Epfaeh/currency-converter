import type { Rate, RatesData } from './types';

export function parseRates(raw: string): RatesData {
  const lines = raw.trim().split(/\r?\n/);

  const headerMatch = lines[0].match(/^(.+?)\s+#(\d+)$/);
  const date = headerMatch?.[1].trim() ?? '';
  const sequence = parseInt(headerMatch?.[2] ?? '0', 10);

  const rates: Rate[] = [];
  for (let i = 2; i < lines.length; i++) {
    const parts = lines[i].split('|');
    if (parts.length !== 5) continue;

    const [country, currency, amountStr, code, rateStr] = parts;
    const amount = parseFloat(amountStr);
    const rate = parseFloat(rateStr);
    // parseFloat('') is NaN, so empty/non-numeric cells are rejected here.
    if (Number.isNaN(amount) || Number.isNaN(rate)) continue;

    rates.push({ country, currency, amount, code, rate });
  }

  return { date, sequence, rates };
}
