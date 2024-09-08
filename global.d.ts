declare interface Window {
  __Tracker__: ITracker;
  __isInit__: boolean;
  __Method__: Method;
}

declare namespace WechatMiniprogram {
  interface Wx {
    getAppBaseInfo: () => { SDKVersion: string };
    __Tracker__: ITracker;
    __isInit__: boolean;
    __Method__: Method;
  }
}
