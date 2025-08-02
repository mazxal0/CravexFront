import { LineData } from 'lightweight-charts';
import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';
import { RootStore } from '@/shared/stores/RootStore';
import { type CurrentAsset } from '@/shared/types';
import { DateForChart } from '@/shared/types/ChartData.types';
import { Transaction } from '@/shared/types/Transaction.types';

export class CurrentActivityStore {
  private rootStore: RootStore;
  private _dateOfChart: DateForChart = '1';
  private _dataForChart: LineData[] = [];
  private _currentAsset: CurrentAsset = {
    id: '',
    coinId: '',
    name: '',
    symbol: '',
    amount: 0,

    logoUrl: '',

    totalSum: 0,

    currentPrice: 0,
    currentMarketCap: 0,
    currentVolume: 0,
    fullyDilutedValuation: 0,
    marketCapRank: 0,

    circulatingSupply: 0,
    totalSupply: 0,
    maxSupply: 0,

    change24hPercent: 0,
    change7dPercent: 0,
    change14dPercent: 0,
    change30dPercent: 0,
    change60dPercent: 0,
    change1yPercent: 0,

    ath: 0,
    athDate: '',
    atl: 0,
    atlDate: '',

    lastUpdated: '',

    // для графиков
    prices: [],
    marketCaps: [],
    volumes: [],
    isOpenChart: false,
  };
  private _currentTransaction: Transaction | undefined = undefined;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async getPricesForChart() {
    try {
      if (typeof this.currentAsset.name === 'undefined') {
        return [];
      }
      const response = await api.get(
        `/coin/chart_data/${this.currentAsset.name}`,
        { params: { vs_currency: 'usd', days: this.dateOfChart } },
      );
      const data = response.data;

      this.supplementCurrentAsset = {
        ...this._currentAsset,
        prices: data.prices,
        volumes: data.volumes,
        currentVolume: data.volumes[data.volumes.length - 1].value,
        marketCaps: data.marketCaps,
        currentMarketCap: data.marketCaps[data.marketCaps.length - 1].value,
      };
      this.dataForChart = this.currentAsset?.prices;
    } catch (er) {
      console.error(er);
    }
  }

  set dateOfChart(date: DateForChart) {
    this._dateOfChart = date;
    this.getPricesForChart();
  }

  get dateOfChart() {
    return this._dateOfChart;
  }

  // set currentAsset(asset: Asset) {
  //   this._currentAsset = {
  //     ...asset,
  //     prices: [],
  //     volumes: [],
  //     marketCaps: [],
  //     currentVolume: 0,
  //     currentMarketCap: 0,
  //   };
  //   this.getPricesForChart();
  // }

  set supplementCurrentAsset(asset: CurrentAsset) {
    this._currentAsset = asset;
  }

  get currentAsset(): CurrentAsset {
    return this._currentAsset;
  }

  set dataForChart(newData: LineData[]) {
    this._dataForChart = newData;
  }
  get dataForChart() {
    return this._dataForChart;
  }

  set currentTransaction(newTransaction: Transaction | undefined) {
    this._currentTransaction = newTransaction;
  }
  get currentTransaction(): Transaction | undefined {
    return this._currentTransaction;
  }

  async setCurrentAssetId(newAssetId: string) {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_GET_ONE_ASSET_FOR_WALLET}/${this.rootStore.userStore.walletId}/assets/${newAssetId}`,
      );
      this._currentAsset = response.data;
      await this.getPricesForChart();
      // console.log(toJS(this._currentAsset));
    } catch (error) {
      console.log(error);
    }
  }
}
