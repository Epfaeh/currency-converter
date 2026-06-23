export interface Rate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface RatesData {
  date: string;
  sequence: number;
  rates: Rate[];
}
