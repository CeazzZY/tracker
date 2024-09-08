import { init } from '@ceazzzy-tracing/core';
import Method from './lib/method';
import { InitOptions } from '@ceazzzy-tracing/shared';

export function initWeb(options: InitOptions) {
  const method = new Method();
  init(method, options);
}
