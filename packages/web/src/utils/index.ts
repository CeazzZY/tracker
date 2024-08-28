export function isSupportSendBeacon() {
  return !!window.navigator?.sendBeacon;
}
