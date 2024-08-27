import { AnyFun } from '@ceazzzy-tracing/shared';

class Global {
  listenRouteChange(callback: AnyFun) {
    wx.onAppRoute(callback);
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
