declare interface Window {
  __Tracker__: ITracker;
  __isInit__: boolean;
}

declare interface Wx {
  __Tracker__: ITracker;
  __isInit__: boolean;
  [key: string]: any;
}

declare let wx: Wx;
