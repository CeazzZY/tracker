import { IErr } from '@ceazzzy-tracing/shared';
import { EVENTTYPES } from '../common';
import { eventBus } from './eventBus';

export function initErr() {
  eventBus.addEvent({
    type: EVENTTYPES.ERROR,
    callback: (e: IErr) => {
      console.log(e);
    },
  });

  eventBus.addEvent({
    type: EVENTTYPES.UNHANDLEDREJECTION,
    callback: (e: IErr) => {
      console.log(e);
    },
  });
}
