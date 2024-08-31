import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { IRouteInfo } from './types';
import { parseErr } from './utils/err';

class WxMethod extends Method {
  listenRouteChange(callback: AnyFun) {
    wx.onAppRoute((data: IRouteInfo) => {
      const { path, timeStamp } = data;
      callback(path, timeStamp);
    });
  }

  listenError(callback: (err: IErr) => void) {
    wx.onError((err: string) => {
      const standardErr = parseErr(err);
      callback(standardErr);
    });
  }

  listenUnhandledRejection(callback: AnyFun) {
    wx.onUnhandledRejection(callback);
  }

  getPerformance() {
    wx.getPerformance();
  }

  listenBeforeunload(): void {}

  listenClick(): void {}
}

export default WxMethod;
