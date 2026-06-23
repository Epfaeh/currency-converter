const CNB_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

export async function GET(): Promise<Response> {
  try {
    const cnbRes = await fetch(CNB_URL, { signal: AbortSignal.timeout(5000) });

    if (!cnbRes.ok) {
      return Response.json({ error: "Failed to fetch CNB rates" }, { status: 502 });
    }

    const text = await cnbRes.text();

    return new Response(text, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    console.error("[cnb-proxy]", err);
    return Response.json({ error: "CNB unreachable" }, { status: 502 });
  }
}
