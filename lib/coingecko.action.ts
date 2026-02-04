'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
      // 'x-cg-pro-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}

export async function fetchTrendingCoins(): Promise<TrendingCoin[]> {
  const response = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', {}, 60);
  return response.coins || [];
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  // Step 1: Fetch search results from /search endpoint
  const searchResponse = await fetcher<{ coins: SearchCoin[] }>('/search', { query }, 60);
  const searchCoins = searchResponse.coins || [];

  if (searchCoins.length === 0) {
    return [];
  }

  // Step 2: Extract IDs of the top 10 results
  const topCoinIds = searchCoins.slice(0, 10).map((coin) => coin.id);

  // Step 3: Fetch market data for those IDs from /coins/markets endpoint
  const marketData = await fetcher<CoinMarketData[]>(
    '/coins/markets',
    {
      vs_currency: 'usd',
      ids: topCoinIds.join(','),
    },
    60
  );

  // Step 4: Merge the two datasets
  const mergedCoins: SearchCoin[] = searchCoins.slice(0, 10).map((searchCoin) => {
    const marketCoin = marketData.find((m) => m.id === searchCoin.id);

    return {
      ...searchCoin,
      data: {
        price: marketCoin?.current_price ?? searchCoin.data.price,
        price_change_percentage_24h:
          marketCoin?.price_change_percentage_24h ??
          searchCoin.data.price_change_percentage_24h ??
          0,
      },
    };
  });

  return mergedCoins;
}
