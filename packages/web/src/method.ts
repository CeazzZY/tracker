import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { isSupportSendBeacon } from './utils';
import { parseError } from './utils/err';

class WebMethod extends Method {
  constructor() {
    super();
    if (isSupportSendBeacon())
      this.send = window.navigator.sendBeacon.bind(this);
    this.send = (url: string, data: any) => {
      const img = new Image();
      img.src = url + '?reportData=' + encodeURIComponent(JSON.stringify(data));
    };
  }

  listenRouteChange(callback: AnyFun): void {
    window.addEventListener('hashchange', callback);
  }

  listenError(callback: (err: IErr) => void): void {
    window.addEventListener(
      'error',
      (err: ErrorEvent) => {
        const errInfo = parseError(err);
        callback(errInfo);
      },
      true
    );
  }

  listenUnhandledRejection(callback: (err: IErr) => void): void {
    window.addEventListener(
      'unhandledrejection',
      (err: PromiseRejectionEvent) => {
        const errInfo = parseError(err);
        callback(errInfo);
      }
    );
  }

  listenBeforeunload(callback: AnyFun): void {
    window.addEventListener('beforeunload', callback);
  }

  listenClick(callback: AnyFun): void {
    window.addEventListener('click', callback);
  }

  getPerformance() {}
}

export default WebMethod;
