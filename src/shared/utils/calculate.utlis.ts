import { Asset } from '@/shared/types';

export function calculateTotalPortfolioChange(assets: Asset[]): number {
  if (!Array.isArray(assets)) return 0;
  if (!assets?.length) return 0;

  // Рассчитываем взвешенные изменения
  const { totalChange, totalValue } = assets.reduce(
    (acc, asset) => {
      const value = asset.currentPrice * asset.amount;
      return {
        totalChange: acc.totalChange + asset.change24hPercent * value,
        totalValue: acc.totalValue + value,
      };
    },
    { totalChange: 0, totalValue: 0 },
  );

  return totalValue !== 0 ? (totalChange / totalValue) * 100 : 0;
}
