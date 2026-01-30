import DataTable from '../DataTable';

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

const CategoriesFallback = () => {
  const columns: DataTableColumn<null>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: () => <div className="category-skeleton skeleton" />,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-1">
          <div className="coin-skeleton skeleton" />
          <div className="coin-skeleton skeleton" />
          <div className="coin-skeleton skeleton" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-header-cell',
      cell: () => (
        <div className="change-cell">
          <div className="change-icon skeleton" />
          <div className="value-skeleton-sm skeleton" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: () => <div className="value-skeleton-md skeleton" />,
    },
    {
      header: '24h Volume',
      cellClassName: 'volume-cell',
      cell: () => <div className="value-skeleton-lg skeleton" />,
    },
  ];

  const skeletonData = Array.from({ length: 10 }, () => null);

  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable data={skeletonData} columns={columns} rowKey={(_, index) => `skeleton-${index}`} />
    </div>
  );
};

const CoinsFallback = () => {
  const columns: DataTableColumn<null>[] = [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: () => <div className="rank-skeleton skeleton" />,
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: () => (
        <div className="token-info">
          <div className="token-image-skeleton skeleton" />
          <div className="token-name-skeleton skeleton" />
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className="price-skeleton skeleton" />,
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => <div className="change-skeleton skeleton" />,
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: () => <div className="market-cap-skeleton skeleton" />,
    },
  ];

  const skeletonData = Array.from({ length: 10 }, () => null);

  return (
    <main id="coins-fallback">
      <div className="content">
        <h4>All Coins</h4>
        <DataTable
          tableClassName="coins-table"
          columns={columns}
          data={skeletonData}
          rowKey={(_, index) => `skeleton-${index}`}
        />
      </div>
    </main>
  );
};

export { CoinOverviewFallback, TrendingCoinsFallback, CategoriesFallback, CoinsFallback };
