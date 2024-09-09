import { Method, InitOptions } from '@ceazzzy-tracing/shared';
import { _global, GlobalMethod } from './utils/global';
import { initReplace } from './lib/replace';
import { initErr } from './lib/err';
import { initOptions } from './lib/options';
import { initSendData } from './lib/sendData';
import { initPv } from './lib/pv';
import { initEvent } from './lib/event';
import { initPerformance } from './lib/performance';

export function init(method: Method, options: InitOptions): void {
  if (_global.__isInit__) return;
  GlobalMethod(method);

  if (!initOptions(options)) return;

  initReplace();

  initSendData();
  initPv();
  initErr();
  initPerformance();
  initEvent();

  _global.__isInit__ = true;
}
