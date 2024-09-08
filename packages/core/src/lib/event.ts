import { EVENTTYPES } from '../common';
import { eventBus } from './eventBus';

export function initEvent() {
  eventBus.addEvent({
    type: EVENTTYPES.CLICK,
    callback: (e) => {
      console.log(e);
    },
  });
}
