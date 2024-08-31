import { Method, InitOptions } from '@ceazzzy-tracing/shared';
import { _global, GlobalMethod } from './utils/global';
import { initReplace } from './lib/replace';
import { initErr } from './lib/err';

export function init(method: Method, options: InitOptions): void {
  if (_global.__isInit__) return;
  GlobalMethod(method);
  console.log(options);
  initReplace();

  initErr();

  _global.__isInit__ = true;
}
