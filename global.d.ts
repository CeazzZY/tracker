declare interface Window {
  __Tracker__: ITracker;
  __isInit__: boolean;
  __Method__: Method;
}

declare interface Wx {
  __Tracker__: ITracker;
  __isInit__: boolean;
  __Method__: Method;
  [key: string]: any;
}

declare let wx: Wx;
