import { InitOptions } from '@ceazzzy-tracing/shared';
import { _support } from '../utils/global';
import { getSessionId } from '../utils/userId';

class Options {
  dsn: string = '';
  appName: string = '';
  userId: string = '';
  constructor(options: InitOptions) {
    const { dsn, appName } = options;
    this.dsn = dsn;
    this.appName = appName;
    this.userId = getSessionId();
  }
}

function validateInitOption(options: InitOptions) {
  const { dsn, appName } = options;
  if (!dsn && !appName) return false;
  return true;
}

export let options: any;

export function initOptions(options: InitOptions) {
  if (!validateInitOption(options)) return false;
  options = new Options(options);
  _support.options = options;
  return true;
}
