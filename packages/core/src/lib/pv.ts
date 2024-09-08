import { EVENTTYPES } from '../common';
import { eventBus } from './eventBus';
import { _method } from '../utils/global';
import { sendData } from './sendData';
import { DataType } from '../types';
import { getCurrentTime } from '@ceazzzy-tracing/shared';

let oldURL: string;
let durationStartTime = getCurrentTime();

export function initPv() {
  let lastIsPop = false;
  let repetitionRoute = false;

  eventBus.addEvent({
    type: EVENTTYPES.ROUTECHANGE,
    callback: (url) => {
      sendPv(url);
    },
  });

  eventBus.addEvent({
    type: EVENTTYPES.HISTORYPUSHSTATE,
    callback: () => {
      console.log('history');
      if (repetitionRoute) return;
      lastIsPop = false;
      sendPv();
    },
  });

  eventBus.addEvent({
    type: EVENTTYPES.HISTORYREPLACESTATE,
    callback: () => {
      console.log('replace');
      repetitionRoute = true;
      lastIsPop = false;
      sendPv();
      setTimeout(() => {
        repetitionRoute = false;
      }, 100);
    },
  });

  eventBus.addEvent({
    type: EVENTTYPES.HASHCHANGE,
    callback: () => {
      console.log('hash');
      if (repetitionRoute) return;
      if (!lastIsPop) sendPv();
      lastIsPop = false;
    },
  });

  eventBus.addEvent({
    type: EVENTTYPES.POPSTATE,
    callback: () => {
      console.log('pop');
      if (repetitionRoute) return;
      if (_method.getCurrentUrl() !== '') {
        const oldHost =
          oldURL.indexOf('#') > 0
            ? oldURL.slice(0, oldURL.indexOf('#'))
            : oldURL;
        if (
          _method
            .getCurrentUrl()
            .slice(0, _method.getCurrentUrl().indexOf('#')) === oldHost
        )
          return;
      }
      lastIsPop = true;
      sendPv();
    },
  });

  sendPv();

  eventBus.addEvent({
    type: EVENTTYPES.BEFOREUNLOAD,
    callback: () => {},
  });
}

function sendPv(referer?: string) {
  setTimeout(() => {
    if (!referer) referer = _method.getCurrentUrl();
    if (!referer) return;
    sendData.addData(DataType.PV, { referer });

    const durationTime = getCurrentTime() - durationStartTime;
    durationStartTime = getCurrentTime();

    if (oldURL && durationTime > 500) {
      sendData.addData(DataType.PVDURING, {
        referer: oldURL,
        during: durationTime,
      });
    }

    oldURL = referer;
  }, 17);
}
