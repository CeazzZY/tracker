import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { IRouteInfo } from './types';
import { parseAsyncErr, parseSyncErr } from './utils/err';

class WxMethod extends Method {
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

  getPerformance() {
    wx.getPerformance();
  }

  listenBeforeunload(): void {}

  listenClick(): void {}
}

export default WxMethod;
