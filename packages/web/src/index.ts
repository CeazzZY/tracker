import { init } from '@ceazzzy-tracing/core';
import Global from './global';

export function initWeb(options: any) {
  if (window.__isInit__) return;

  const global = new Global();
  window.__Tracker__ = global;

  init(options);

  window.__isInit__ = true;
}
