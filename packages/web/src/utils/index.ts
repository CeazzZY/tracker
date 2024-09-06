import { AnyFun, AnyObj, isFunction } from '@ceazzzy-tracing/shared';

export function isSupportSendBeacon() {
  return !!window.navigator?.sendBeacon;
}

export function replaceAop(
  source: AnyObj,
  name: string,
  replacement: AnyFun,
  isForced = false
): void {
  if (source === undefined) return;
  if (name in source || isForced) {
    const original = source[name];
    const wrapped = replacement(original);
    if (isFunction(wrapped)) {
      source[name] = wrapped;
    }
  }
}
