import Converter from '@/components/Converter';
import LiveDataWrapper from '@/components/LiveDataWrapper';
import { fetcher } from '@/lib/coingecko.action';
import { formatCurrency, normalizeUrl } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  let coinData: CoinDetailsData;
  let coinOHLCData: OHLCData[];

  try {
    [coinData, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${id}`, {
        dex_pair_format: 'contract_address',
      }),
      fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: 'usd',
        days: 1,
        precision: 'full',
      }),
    ]);
  } catch (error) {
    console.error('Error fetching coin details:', error);
  }

  const coinDetails = [
    {
      label: 'Market Cap',
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },
    {
      label: 'Market Cap Rank',
      value: `# ${coinData.market_cap_rank}`,
    },
    {
      label: 'Total Volume',
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: 'Website',
      value: '-',
      link: coinData.links.homepage?.[0] ? normalizeUrl(coinData.links.homepage[0]) : undefined,
      linkText: 'Homepage',
    },
    {
      label: 'Explorer',
      value: '-',
      link: coinData.links.subreddit_url ? normalizeUrl(coinData.links.subreddit_url) : undefined,
      linkText: 'Explorer',
    },
    {
      label: 'Community',
      value: '-',
      link: normalizeUrl(coinData.links.subreddit_url),
      linkText: 'Community',
    },
  ];

  return (
    <main id="coin-details-page">
      <section className="primary">
        <LiveDataWrapper coinId={id} coin={coinData} coinOHLCData={coinOHLCData}>
          <h4>Exchange Listings</h4>
        </LiveDataWrapper>

        <h1 className="text-3xl font-bold">
          Coin <strong>{id}</strong>
        </h1>
      </section>

      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />

        <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className={label}>{label}</p>

                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText || label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p>Top Gainers and Losers</p>
      </section>
    </main>
  );
};

export default Page;
