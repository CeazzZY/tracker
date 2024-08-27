import { init } from '@ceazzzy-tracing/core';
import Global from './global';
import { InitOptions } from '@ceazzzy-tracing/shared';

export function initWeb(options: InitOptions) {
  if (window.__isInit__) return;

  const global = new Global();
  window.__Tracker__ = global;

  init(options);

  window.__isInit__ = true;
}
