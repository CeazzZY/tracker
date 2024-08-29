import { Method, InitOptions } from '@ceazzzy-tracing/shared';
import { _global } from './utils/global';
import { initReplace } from './lib/replace';

export function init(method: Method, options: InitOptions): void {
  if (_global.__isInit__) return;
  _global.__Method__ = method;
  console.log(options);
  initReplace();

  _global.__isInit__ = true;
}
