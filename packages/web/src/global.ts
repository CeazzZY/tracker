import { AnyFun } from '@ceazzzy-tracing/shared';

class Global {
  listenRouteChange(callback: AnyFun) {
    window.addEventListener('hashchange', callback);
  }

  send() {}

  listenError() {}
}

export default Global;
