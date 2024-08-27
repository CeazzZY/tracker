import { init } from '@ceazzzy-tracing/core';
import Global from './global';

export function initWxapp(options: any) {
  if (wx.__isInit__) return;

  const global = new Global();
  wx.__Tracker__ = global;

  init(options);

  wx.__isInit__ = true;
}
