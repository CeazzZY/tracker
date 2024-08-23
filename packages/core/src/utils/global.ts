import { ITracker } from '../types';

export const _global = getGlobal();
export const _support = getGlobalSupport();

export function getGlobal(): Window {
  return window as unknown as Window;
}

export function getGlobalSupport(): ITracker {
  _global.__Tracker__ = _global.__Tracker__ || ({} as ITracker);
  return _global.__Tracker__;
}
