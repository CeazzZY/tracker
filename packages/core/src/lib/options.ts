import { InitOptions } from '@ceazzzy-tracing/shared';
import { _support } from '../utils/global';

class Options {
  dsn: string = '';
  appName: string = '';
  userID: string = '';
  constructor(options: InitOptions) {
    console.log(options);
  }
}

export let options: any;

export function initOptions(options: InitOptions) {
  options = new Options(options);
  _support.options = options;
  return true;
}
