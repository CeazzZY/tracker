export interface InitOptions {
  dsn: string;
  appName: string;
  useID: string;
}

export interface ITracker {
  eventBus: any;
}

export abstract class Method {
  send: any;
  abstract listenRouteChange(callback: AnyFun): void;
  abstract listenError(callback: AnyFun): void;
  abstract listenUnhandledRejection(callback: AnyFun): void;
  abstract listenBeforeunload(callback: AnyFun): void;
  abstract listenClick(callback: AnyFun): void;
  abstract getPerformance(): void;
}

export type AnyFun = (...arg: any[]) => any;
