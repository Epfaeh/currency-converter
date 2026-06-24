// Number/currency formatting, instantiated once and reused across renders.

// Rates are quoted in CZK, so this single instance covers the rates table.
export const czk = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
})

// The converter formats into the user-selected currency, so we can't share a
// single instance — cache one formatter per currency code instead.
const byCode = new Map<string, Intl.NumberFormat>()

export function currencyFmt(code: string): Intl.NumberFormat {
  let fmt = byCode.get(code)
  if (!fmt) {
    fmt = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: code })
    byCode.set(code, fmt)
  }
  return fmt
}
