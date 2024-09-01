import { _method } from './../utils/global';
import { EVENTTYPES } from '../common';
import { isValidKey } from '../utils';
import { eventBus } from './eventBus';
import { IErr } from '@ceazzzy-tracing/shared';

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
  _method.listenError(function (err: IErr) {
    eventBus.runEvent(type, err);
  });
}

function listenClick(type: EVENTTYPES) {
  _method.listenClick(function (err: ErrorEvent) {
    eventBus.runEvent(type, err);
  });
}

function listenUnhandledrejection(type: EVENTTYPES) {
  _method.listenUnhandledRejection(function (err: IErr) {
    eventBus.runEvent(type, err);
  });
}

function listenBeforeunload(type: EVENTTYPES) {
  _method.listenBeforeunload(function (event: BeforeUnloadEvent) {
    eventBus.runEvent(type, event);
  });
}

function listenHashchange(type: EVENTTYPES) {
  _method.listenRouteChange(function (event: HashChangeEvent) {
    eventBus.runEvent(type, event);
  });
}
