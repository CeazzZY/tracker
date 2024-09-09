import { InitOptions } from '@ceazzzy-tracing/shared';
import { _support } from '../utils/global';
import { getStorageId } from '../utils/userId';

class Options {
  dsn: string = '';
  appId: string = '';
  userId: string = '';
  constructor(options: InitOptions) {
    const { dsn, appId } = options;
    this.dsn = dsn;
    this.appId = appId;
    this.userId = getStorageId();
  }
}

function validateInitOption(options: InitOptions) {
  const { dsn, appId } = options;
  if (!dsn && !appId) return false;
  return true;
}

export let options: any;

export function initOptions(option: InitOptions) {
  if (!validateInitOption(option)) return false;
  options = new Options(option);
  _support.options = options;
  return true;
}
