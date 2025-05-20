import axios from 'axios';
import { LineData } from 'lightweight-charts';
import { makeAutoObservable } from 'mobx';

import { DateForChart } from '@/shared/types/ChartData.types';

class CurrentActivityStore {
  private _dateOfChart: DateForChart = '1';
  private _currentAsset: string = 'bitcoin';
  private _prices: LineData[] = [];

  public constructor() {
    makeAutoObservable(this);
  }

  async getPricesForChart() {
    try {
      const response = await axios.get(
        `http://localhost:8080/coin/chart_data/${this._currentAsset}?vs_currency=usd&days=${this._dateOfChart}`,
      );
      this.prices = response.data.prices;
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

  set currentAsset(asset: string) {
    this._currentAsset = asset;
    this.getPricesForChart();
  }

  get currentAsset() {
    return this._currentAsset;
  }

  set prices(prices: LineData[]) {
    this._prices = prices;
  }

  get prices() {
    return this._prices;
  }
}

export const currentActivityStore = new CurrentActivityStore();
