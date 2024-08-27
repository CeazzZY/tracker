import { EVENTTYPES } from '../common';
import { isValidKey } from '../utils';
import { _global } from '../utils/global';
import { eventBus } from './eventBus';

export function initReplace(): void {
  for (const key in EVENTTYPES) {
    if (isValidKey(key, EVENTTYPES)) {
      replace(key);
    }
  }
}

function replace(type: EVENTTYPES) {
  if (!isValidKey(type, EVENTTYPES)) return;

  const value = EVENTTYPES[type];
  // debug('replace-初始化挂载事件:', value)
  switch (value) {
    case EVENTTYPES.ERROR:
      listenError(EVENTTYPES.ERROR);
      break;
    case EVENTTYPES.UNHANDLEDREJECTION:
      listenUnhandledrejection(EVENTTYPES.UNHANDLEDREJECTION);
      break;

    case EVENTTYPES.CLICK:
      listenClick(EVENTTYPES.CLICK);
      break;

    case EVENTTYPES.BEFOREUNLOAD:
      listenBeforeunload(EVENTTYPES.BEFOREUNLOAD);
      break;

    case EVENTTYPES.HASHCHANGE:
      listenHashchange(EVENTTYPES.HASHCHANGE);
      break;

    default:
      break;
  }
}

function listenError(type: EVENTTYPES) {
  _global.__Tracker__.listenError(function (e: ErrorEvent) {
    eventBus.runEvent(type, e);
  });
}

function listenClick(type: EVENTTYPES) {
  _global.__Tracker__.listenClick(function (e: ErrorEvent) {
    eventBus.runEvent(type, e);
  });
}

function listenUnhandledrejection(type: EVENTTYPES) {
  console.log(type);
}

function listenBeforeunload(type: EVENTTYPES) {
  console.log(type);
}

function listenHashchange(type: EVENTTYPES) {
  console.log(type);
}
