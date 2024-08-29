import { Method, ITracker } from '@ceazzzy-tracing/shared';

function getGlobal(): Window | Wx {
  if (window) return window;
  if (wx) return wx;

  console.warn('不支持当前环境');
  return {} as Window;
}

function getGlobalSupport(): ITracker {
  _global.__Tracker__ = _global.__Tracker__ || ({} as ITracker);
  return _global.__Tracker__;
}

function getGlobalMethod(): Method {
  _global.__Method__ = _global.__Method__ || ({} as Method);
  return _global.__Method__;
}

export const _global = getGlobal();
export const _support = getGlobalSupport();
export const _method = getGlobalMethod();
