import { Asset } from '@/shared/types';

export function calculateTotalPortfolioChange(assets: Asset[]): number {
  if (!Array.isArray(assets)) return 0;
  if (!assets?.length) return 0;

  // Рассчитываем взвешенные изменения
  const { totalChange, totalValue } = assets.reduce(
    (acc, asset) => {
      const value = asset.price * asset.amount;
      return {
        totalChange: acc.totalChange + asset.changing * value,
        totalValue: acc.totalValue + value,
      };
    },
    { totalChange: 0, totalValue: 0 },
  );

  return totalValue !== 0 ? (totalChange / totalValue) * 100 : 0;
}
