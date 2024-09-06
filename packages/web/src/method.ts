import { AnyFun, IErr, Method, VoidFun } from '@ceazzzy-tracing/shared';
import { isSupportSendBeacon, replaceAop } from './utils';
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

  getCurrentUrl(): string {
    return document.location.href;
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

  listenHistoryPushState(callback: AnyFun): void {
    if (!('history' in window)) return;
    if (!('pushState' in window.history)) return;
    replaceAop(window.history, 'pushState', (originalSend: VoidFun) => {
      return function (this: any, ...args: any[]): void {
        callback(...args);
        originalSend.apply(this, args);
      };
    });
  }

  listenHistoryReplaceState(callback: AnyFun): void {
    if (!('history' in window)) return;
    if (!('pushState' in window.history)) return;
    replaceAop(window.history, 'replaceState', (originalSend: VoidFun) => {
      return function (this: any, ...args: any[]): void {
        callback(...args);
        originalSend.apply(this, args);
      };
    });
  }

  listenHashChange(callback: AnyFun): void {
    window.addEventListener('hashchange', callback);
  }

  listenPopstateChange(callback: AnyFun): void {
    window.addEventListener('popstate', callback);
  }

  listenBeforeunload(callback: AnyFun): void {
    window.addEventListener('beforeunload', callback);
  }

  listenClick(callback: AnyFun): void {
    window.addEventListener('click', callback);
  }

  getPerformance() {}

  listenRouteChange(): void {}
}

export default WebMethod;
