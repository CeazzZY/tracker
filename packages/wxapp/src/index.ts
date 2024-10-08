import { init } from '@ceazzzy-tracing/core';
import { InitOptions } from '@ceazzzy-tracing/shared';
import Method from './lib/method';

export function initWxapp(options: InitOptions) {
  const method = new Method();
  init(method, options);
}
