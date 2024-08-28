import { AnyFun } from '@ceazzzy-tracing/shared';
import { IRouteInfo } from './types';

class Global {
  listenRouteChange(callback: AnyFun) {
    wx.onAppRoute((data: IRouteInfo) => {
      const { path, timeStamp } = data;
      callback(path, timeStamp);
    });
  }

  listenError(callback: AnyFun) {
    wx.onError(callback);
  }

  listenUnhandledRejection(callback: AnyFun) {
    wx.onUnhandledRejection(callback);
  }

  getPerformance() {
    wx.getPerformance();
  }

  send() {}
}

export default Global;
