import { AnyFun, Method } from '@ceazzzy-tracing/shared';
import { isSupportSendBeacon } from './utils';

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

  listenRouteChange(callback: AnyFun) {
    window.addEventListener('hashchange', callback);
  }

  listenError(callback: AnyFun) {
    window.addEventListener('error', callback);
  }

  listenUnhandledRejection(callback: AnyFun) {
    window.addEventListener('unhandledrejection', callback);
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
