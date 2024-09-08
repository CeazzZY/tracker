import { Method, ITracker } from '@ceazzzy-tracing/shared';

export const _global = getGlobal();
export const _support = getGlobalSupport();
export let _method: Method;

function getGlobal(): Window | WechatMiniprogram.Wx {
  if (window) return window;
  if (wx) return wx;

  console.warn('不支持当前环境');
  return {} as Window;
}

function getGlobalSupport(): ITracker {
  _global.__Tracker__ = _global.__Tracker__ || ({} as ITracker);
  return _global.__Tracker__;
}

export function GlobalMethod(method: Method) {
  _global.__Method__ = _global.__Method__ || method;
  _method = _global.__Method__;
}
