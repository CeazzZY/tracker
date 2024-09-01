export interface InitOptions {
  dsn: string;
  appName: string;
  userID: string;
}

export interface ITracker {
  eventBus: any;
  sendData: any;
  options: any;
}

export abstract class Method {
  send: any;
  abstract listenRouteChange(callback: AnyFun): void;
  abstract listenError(callback: (err: IErr) => void): void;
  abstract listenUnhandledRejection(callback: (err: IErr) => void): void;
  abstract listenBeforeunload(callback: AnyFun): void;
  abstract listenClick(callback: AnyFun): void;
  abstract getPerformance(): void;
}

export enum ErrorType {
  JS = 'js',
  RS = 'resource',
  PM = 'promise',
  HP = 'http',
  CS = 'cors',
}

export interface IErr {
  type: ErrorType;
  errId: string;
  msg: string;
  filename?: string;
  stack?: IErrStack[];
}

export interface IErrStack {
  filename: string;
  col: string;
  line: string;
}

export type AnyFun = (...arg: any[]) => any;
