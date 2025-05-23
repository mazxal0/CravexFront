import axios from 'axios';
import { LineData } from 'lightweight-charts';
import { makeAutoObservable } from 'mobx';

import { type Asset, type CurrentAsset } from '@/shared/types';
import { DateForChart } from '@/shared/types/ChartData.types';

export class CurrentActivityStore {
  private _dateOfChart: DateForChart = '1';
  private _dataForChart: LineData[] = [];
  private _currentAsset: CurrentAsset = {
    coinId: '',
    coinName: '',
    coinSymbol: '',
    amount: 0,
    price: 0,
    logoUrl: '',
    changing: 0,
    volume: 0,
    marketCap: 0,
    prices: [],
    marketCaps: [],
    volumes: [],
  };

  public constructor() {
    makeAutoObservable(this);
  }

  async getPricesForChart() {
    try {
      console.log(this.currentAsset.coinName);
      const response = await axios.get(
        `http://localhost:8080/coin/chart_data/${this.currentAsset.coinName}?vs_currency=usd&days=${this.dateOfChart}`,
      );
      const data = response.data;

      this.supplementCurrentAsset = {
        ...this._currentAsset,
        prices: data.prices,
        volumes: data.volumes,
        volume: data.volumes[data.volumes.length - 1].value,
        marketCaps: data.marketCaps,
        marketCap: data.marketCaps[data.marketCaps.length - 1].value,
      };
      this.dataForChart = this.currentAsset?.prices || [];
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

  set currentAsset(asset: Asset) {
    this._currentAsset = {
      ...asset,
      prices: [],
      volumes: [],
      marketCaps: [],
      volume: 0,
      marketCap: 0,
    };
    this.getPricesForChart();
  }

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
}

export const currentActivityStore = new CurrentActivityStore();
