import { Method, InitOptions } from '@ceazzzy-tracing/shared';
import { _global, GlobalMethod } from './utils/global';
import { initReplace } from './lib/replace';
import { initErr } from './lib/err';
import { initOptions } from './lib/options';
import { initSendData } from './lib/sendData';

export function init(method: Method, options: InitOptions): void {
  if (_global.__isInit__) return;
  if (!initOptions(options)) return;

  GlobalMethod(method);
  console.log(options);
  initReplace();

  initSendData();
  initErr();

  _global.__isInit__ = true;
}
