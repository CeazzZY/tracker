import { InitOptions } from './types';
import { _global } from './utils/global';

export function init(options: InitOptions) {
  if (_global.__isInit__) return;

  console.log(options);
  //注册

  _global.__isInit__ = true;
}
