import { init } from '@ceazzzy-tracing/core';
import { InitOptions } from '@ceazzzy-tracing/shared';
import Global from './global';

export function initWxapp(options: InitOptions) {
  if (wx.__isInit__) return;

  const global = new Global();
  wx.__Tracker__ = global;

  init(options);

  wx.__isInit__ = true;
}
