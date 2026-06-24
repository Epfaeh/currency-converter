import { parseRates } from "../lib/parseRates.js";

const CNB_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

export async function GET(): Promise<Response> {
  try {
    const cnbRes = await fetch(CNB_URL, { signal: AbortSignal.timeout(5000) });

    if (!cnbRes.ok) {
      return Response.json({ error: "Failed to fetch CNB rates" }, { status: 502 });
    }

    const text = await cnbRes.text();
    const data = parseRates(text);

    if (data.rates.length === 0) {
      return Response.json({ error: "Unexpected CNB response" }, { status: 502 });
    }

    return Response.json(data, {
      headers: {
        "cache-control": "s-maxage=60",
      },
    });
  } catch (err) {
    console.error("[cnb-proxy]", err);
    return Response.json({ error: "CNB unreachable" }, { status: 502 });
  }
}
