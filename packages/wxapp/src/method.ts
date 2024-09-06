import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { IRouteInfo } from './types';
import { parseAsyncErr, parseSyncErr } from './utils/err';

class WxMethod extends Method {
  send(url: string, data: any) {
    console.log(data);
    return wx.request({
      url,
      method: 'post',
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
    wx.onUnhandledRejection((err: PromiseRejectionEvent) => {
      const errInfo = parseAsyncErr(err);
      callback(errInfo);
    });
  }

  listenClick(): void {}

  getPerformance() {
    wx.getPerformance();
  }

  listenPopstateChange(): void {}

  listenHistoryPushState(): void {}

  listenHistoryReplaceState(): void {}

  listenBeforeunload(): void {}

  listenHashChange(): void {}
}

export default WxMethod;
