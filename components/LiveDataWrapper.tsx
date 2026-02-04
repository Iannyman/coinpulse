import CandlestickChart from './CandlestickChart';
import CoinHeader from './CoinHeader';
import { Separator } from './ui/separator';

const LiveDataWrapper = async ({ children, coinId, coin, coinOHLCData }: LiveDataProps) => {
  const currentPrice = coin.market_data?.current_price?.usd;
  const priceChange24h = coin.market_data?.price_change_percentage_24h_in_currency?.usd;
  const priceChange30d = coin.market_data?.price_change_percentage_30d_in_currency?.usd;
  const priceChangeCurrency24h = coin.market_data?.price_change_24h_in_currency?.usd;

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.small}
        livePrice={currentPrice ?? 0}
        livePriceChangePercentage24h={priceChange24h ?? 0}
        priceChangePercentage30d={priceChange30d ?? 0}
        priceChange24h={priceChangeCurrency24h ?? 0}
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
      <Separator className="divider" />
    </section>
  );
};

export default LiveDataWrapper;
