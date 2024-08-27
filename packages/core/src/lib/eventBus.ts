import { EVENTTYPES } from '../common/';
import { AnyFun } from '@ceazzzy-tracing/shared';

type Handlers = {
  [key in EVENTTYPES]?: AnyFun[];
};

type Handler = {
  type: EVENTTYPES;
  callback: AnyFun;
};

class EventBus {
  private handlers: Handlers;
  constructor() {
    this.handlers = {};
  }

  addEvent(handler: Handler): void {
    const { type, callback } = handler;
    if (!this.handlers[type]) this.handlers[type] = [];
    const funIndex = this._getCallbackIndex(handler);
    if (funIndex === -1) this.handlers[type].push(callback);
  }

  removeEvent(handler: Handler): void {
    const funIndex = this._getCallbackIndex(handler);
    if (funIndex !== -1) {
      this.handlers[handler.type]?.splice(funIndex, 1);
    }
  }

  runEvent(type: EVENTTYPES, ...args: any[]): void {
    const allEvent = this.getEvent(type);
    allEvent.forEach((fun) => {
      fun(...args);
    });
  }

  getEvent(type: EVENTTYPES): AnyFun[] {
    return this.handlers[type] || [];
  }

  private _getCallbackIndex(handler: Handler): number {
    if (this.handlers[handler.type]) {
      const callbackList = this.handlers[handler.type];
      if (callbackList) {
        return callbackList.findIndex((fun) => fun === handler.callback);
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }
}

export const eventBus = new EventBus();
