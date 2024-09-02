import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { isSupportSendBeacon } from './utils';
import { parseError } from './utils/err';

class WebMethod extends Method {
  send(url: string, data: any) {
    if (isSupportSendBeacon())
      return window.navigator.sendBeacon(url, JSON.stringify(data));

    return new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('post', url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          resolve();
        }
      };
    });
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
