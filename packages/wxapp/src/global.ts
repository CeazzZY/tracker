class Global {
  listenRouteChange(callback: any) {
    wx.onAppRoute(callback);
  }

  listenError(callback: any) {
    wx.onError(callback);
  }

  listenUnhandledRejection(callback: any) {
    wx.onUnhandledRejection(callback);
  }

  getPerformance() {
    wx.getPerformance();
  }

  send() {}
}

export default Global;
