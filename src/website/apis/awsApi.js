// @flow
export async function fetchCurrentQuotes(stockCodes: string[]): Promise<JSON> {
  const apiEndpoint = 'https://w68lqh1j90.execute-api.ap-southeast-2.amazonaws.com/prod/current_quotes';
  const response = await fetch(`${apiEndpoint}?stockCodes=${stockCodes.join(',')}`);
  return response.json();
}

export async function fetchHistoryQuote(stockCode: string, tradeDay: Date): Promise<JSON> {
  const date = tradeDay.toISOString().substring(0, 10);
  const apiEndpoint = 'https://w68lqh1j90.execute-api.ap-southeast-2.amazonaws.com/prod/history_quotes';
  const url = `${apiEndpoint}?stockCode=${stockCode}&date=${date}`;

  const cache = await caches.open('stock-eye');
  let response = await cache.match(url);
  if (!response) {
    await cache.add(url);
    response = await cache.match(url);
  }

  return response.json();
}
