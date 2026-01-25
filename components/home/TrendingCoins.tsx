import { fetcher } from '@/lib/coingecko.action';
import DataTable from '../DataTable';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatPercentage } from '@/lib/utils';
import { TrendingCoinsFallback } from './fallback';

const TrendingCoins = async () => {
  let trendingCoins: { coins: TrendingCoin[] } | null = null;

  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return <TrendingCoinsFallback />;
  }

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;

        return (
          <Link href={`/coins/${item.id}`}>
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: '24H Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUP = item.data.price_change_percentage_24h.usd > 0;

        return (
          <div className={cn('price-change', isTrendingUP ? 'text-green-500' : 'text-red-500')}>
            <p className="flex items-center gap-1">
              {formatPercentage(item.data.price_change_percentage_24h.usd)}
              {isTrendingUP ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => `$${coin.item.data.price.toLocaleString()}`,
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>

      <DataTable
        data={trendingCoins.coins.slice(0, 6)}
        columns={columns}
        rowKey={(coin, index) => coin.item.id || index}
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;
