import { describe, it, expect } from 'vitest';
import { parseRates } from './parseRates';

const SAMPLE = `23 Jun 2026 #120
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.567
United States|dollar|1|USD|21.543
Japan|yen|100|JPY|14.823
`;

describe('parseRates', () => {
  it('extracts date and sequence from line 1', () => {
    const { date, sequence } = parseRates(SAMPLE);
    expect(date).toBe('23 Jun 2026');
    expect(sequence).toBe(120);
  });

  it('parses all 3 data rows', () => {
    const { rates } = parseRates(SAMPLE);
    expect(rates).toHaveLength(3);
    expect(rates[0].code).toBe('AUD');
    expect(rates[1].code).toBe('USD');
    expect(rates[2].code).toBe('JPY');
  });

  it('amount and rate are numbers, not strings', () => {
    const { rates } = parseRates(SAMPLE);
    const aud = rates[0];
    expect(typeof aud.amount).toBe('number');
    expect(typeof aud.rate).toBe('number');
    expect(aud.amount).toBe(1);
    expect(aud.rate).toBe(14.567);
  });

  it('parses JPY with amount = 100', () => {
    const { rates } = parseRates(SAMPLE);
    const jpy = rates.find((r) => r.code === 'JPY')!;
    expect(jpy.amount).toBe(100);
    expect(jpy.rate).toBe(14.823);
  });

  it('skips blank and malformed lines without throwing', () => {
    const raw = `23 Jun 2026 #1
Country|Currency|Amount|Code|Rate
United States|dollar|1|USD|21.543
bad|line
|||
Japan|yen|100|JPY|14.823

`;
    expect(() => parseRates(raw)).not.toThrow();
    const { rates } = parseRates(raw);
    expect(rates).toHaveLength(2);
  });

  it('parses the real CNB format with CRLF line endings', () => {
    // CNB serves the file with \r\n; header and rows must still parse.
    const raw = SAMPLE.replace(/\n/g, '\r\n');
    const { date, sequence, rates } = parseRates(raw);
    expect(date).toBe('23 Jun 2026');
    expect(sequence).toBe(120);
    expect(rates).toHaveLength(3);
    expect(rates[2].code).toBe('JPY');
    expect(rates[2].amount).toBe(100);
  });

  it('skips a 5-field row with an empty numeric cell', () => {
    const raw = `23 Jun 2026 #1
Country|Currency|Amount|Code|Rate
Nowhere|nothing||XXX|
United States|dollar|1|USD|21.543
`;
    const { rates } = parseRates(raw);
    expect(rates).toHaveLength(1);
    expect(rates[0].code).toBe('USD');
  });
});
