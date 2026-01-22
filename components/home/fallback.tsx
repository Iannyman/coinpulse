import DataTable from '../DataTable';
import type { DataTableColumn } from '@/type.s';

const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="period-button-skeleton skeleton" />
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

const TrendingCoinsFallback = () => {
  const columns: DataTableColumn<null>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: '24H Change',
      cellClassName: 'change-cell',
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className="price-line skeleton" />,
    },
  ];

  const skeletonData = Array.from({ length: 6 }, () => null);

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          data={skeletonData}
          columns={columns}
          rowKey={(_, index) => `skeleton-${index}`}
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export { CoinOverviewFallback, TrendingCoinsFallback };
