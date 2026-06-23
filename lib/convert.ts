import type { Rate } from './types';

export function convert(czk: number, rate: Rate): number {
  return (czk * rate.amount) / rate.rate;
}
