import { IErr } from '@ceazzzy-tracing/shared';
import { EVENTTYPES } from '../common';
import { eventBus } from './eventBus';
import { sendData } from './sendData';
import { DataType } from '../types';

const errShouldIgnore: string[] = [];

export function initErr() {
  eventBus.addEvent({
    type: EVENTTYPES.ERROR,
    callback: (e: IErr) => {
      const id = e.errId;
      if (checkErrShouldIgnore(id)) sendData.addData(DataType.ERROR, e);
    },
  });

  eventBus.addEvent({
    type: EVENTTYPES.UNHANDLEDREJECTION,
    callback: (e: IErr) => {
      const id = e.errId;
      if (checkErrShouldIgnore(id)) sendData.addData(DataType.ERROR, e);
    },
  });
}

function checkErrShouldIgnore(id: string): boolean {
  const index = errShouldIgnore.findIndex((item) => item === id);
  if (index > -1) return false;

  errShouldIgnore.push(id);
  return true;
}
