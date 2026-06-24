import { describe, it, expect } from 'vitest';
import { convert } from './convert';
import type { Rate } from './types';

const USD: Rate = {
  country: 'United States',
  currency: 'dollar',
  amount: 1,
  code: 'USD',
  rate: 21.543,
};

const JPY: Rate = {
  country: 'Japan',
  currency: 'yen',
  amount: 100,
  code: 'JPY',
  rate: 14.823,
};

describe('convert', () => {
  it('converts at an amount = 1 currency', () => {
    expect(convert(100, USD)).toBeCloseTo(100 / 21.543);
  });

  it('respects amount = 100 currencies (JPY quoted per 100)', () => {
    expect(convert(100, JPY)).toBeCloseTo((100 * 100) / 14.823);
    // would-be-wrong value if amount were ignored — proves amount matters
    expect(convert(100, JPY)).not.toBeCloseTo(100 / 14.823);
  });

  it('converts 0 CZK to 0', () => {
    expect(convert(0, JPY)).toBe(0);
  });

  it('converts a negative amount', () => {
    expect(convert(-100, USD)).toBeCloseTo(-100 / 21.543);
  });
});
