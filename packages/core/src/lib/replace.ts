import { _method } from '../utils/global';
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
    case EVENTTYPES.HISTORYPUSHSTATE:
      replaceHistoryPushState(EVENTTYPES.HISTORYPUSHSTATE);
      break;
    case EVENTTYPES.HISTORYREPLACESTATE:
      replaceHistoryReplaceState(EVENTTYPES.HISTORYREPLACESTATE);
      break;
    case EVENTTYPES.POPSTATE:
      listenPopstateChange(EVENTTYPES.POPSTATE);
      break;
    case EVENTTYPES.ROUTECHANGE:
      listenRouteChange(EVENTTYPES.ROUTECHANGE);
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

function replaceHistoryReplaceState(type: EVENTTYPES): void {
  _method.listenHistoryReplaceState(function (...args) {
    eventBus.runEvent(type, ...args);
  });
}

function replaceHistoryPushState(type: EVENTTYPES): void {
  _method.listenHistoryPushState(function (...args) {
    eventBus.runEvent(type, ...args);
  });
}

function listenHashchange(type: EVENTTYPES) {
  _method.listenHashChange(function (event: HashChangeEvent) {
    eventBus.runEvent(type, event);
  });
}

function listenPopstateChange(type: EVENTTYPES) {
  _method.listenPopstateChange(function () {
    eventBus.runEvent(type);
  });
}

function listenRouteChange(type: EVENTTYPES) {
  _method.listenRouteChange(function (path: string, timeStamp: number) {
    eventBus.runEvent(type, path, timeStamp);
  });
}
