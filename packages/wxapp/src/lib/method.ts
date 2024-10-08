import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { IRouteInfo } from '../types';
import { parseAsyncErr, parseSyncErr } from './err';
import { performanceObserverCallback } from './performance';
import { DataType, ISendData } from 'packages/core/src/types';

class WxMethod extends Method {
  performance: WechatMiniprogram.Performance = wx.getPerformance();
  send(url: string, data: any) {
    return wx.request({
      url,
      method: 'POST',
      data: JSON.stringify(data),
      header: {
        'Content-Type': 'application/json',
      },
    });
  }

  getCurrentUrl(): string {
    return '';
  }

  listenRouteChange(callback: AnyFun) {
    //@ts-ignore
    wx.onAppRoute((data: IRouteInfo) => {
      const { path, timeStamp } = data;
      callback(path, timeStamp);
    });
  }

  listenError(callback: (err: IErr) => void) {
    wx.onError((err: string) => {
      const errInfo = parseSyncErr(err);
      callback(errInfo);
    });
  }

  listenUnhandledRejection(callback: (err: IErr) => void) {
    wx.onUnhandledRejection(
      (err: WechatMiniprogram.OnUnhandledRejectionCallbackResult) => {
        const errInfo = parseAsyncErr(err);
        callback(errInfo);
      }
    );
  }

  createPerformanceObserve(
    options: PerformanceObserverInit,
    callback: PerformanceObserverCallback
  ): void {
    this.performance.createObserver(callback).observe(options);
  }

  observePerformance(
    report: (type: DataType, data: ISendData['data']) => void
  ): void {
    this.createPerformanceObserve(
      {
        entryTypes: ['render', 'script', 'navigation'],
      },
      performanceObserverCallback(report)
    );
  }
  getLocalStorage(key: string): any {
    return wx.getStorageSync(key);
  }

  setLocalStorage(key: string, value: any): void {
    wx.setStorageSync(key, value);
  }

  removeLocalStorage(key: string): void {
    wx.removeStorageSync(key);
  }

  listenClick(): void {}

  listenPopstateChange(): void {}

  listenHistoryPushState(): void {}

  listenHistoryReplaceState(): void {}

  listenBeforeunload(): void {}

  listenHashChange(): void {}
}

export default WxMethod;
