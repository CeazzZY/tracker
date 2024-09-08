export interface InitOptions {
  dsn: string;
  appId: string;
}

export interface ITracker {
  eventBus: any;
  sendData: any;
  options: any;
}

export abstract class Method {
  abstract performance: Performance;

  abstract send(url: string, data: any): any;
  abstract getCurrentUrl(): string;

  abstract listenError(callback: (err: IErr) => void): void;
  abstract listenUnhandledRejection(callback: (err: IErr) => void): void;

  //wxapp
  abstract listenRouteChange(callback: AnyFun): void;
  //web
  abstract listenHashChange(callback: AnyFun): void;
  abstract listenHistoryPushState(callback: AnyFun): void;
  abstract listenHistoryReplaceState(callback: AnyFun): void;
  abstract listenPopstateChange(callback: AnyFun): void;

  abstract listenBeforeunload(callback: AnyFun): void;

  abstract listenClick(callback: AnyFun): void;
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

export interface IPv {
  referer: string;
}

export interface IPvDuring {
  referer: string;
  during: number;
}

export interface IErrStack {
  filename: string;
  col: string;
  line: string;
}

export type AnyFun = (...arg: any[]) => any;

export type AnyObj<T = any> = {
  [key: string]: T;
};

export type VoidFun = {
  (...args: any[]): void;
};
