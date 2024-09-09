import { getCurrentTime } from '@ceazzzy-tracing/shared';
import { _method } from './global';

export function getSessionId(): string {
  return 'id';
}

export function getStorageId() {
  const id = _method.getLocalStorage('uuid');
  const now = getCurrentTime();
  if (id) {
    const [time] = id.split('_');

    if (now - time < 1000 * 60 * 60 * 24 * 1) {
      return id;
    }
  }

  const newId = `${now}_${Math.floor(Math.random() * (1000000 - 0) + 0)}`;
  _method.setLocalStorage('uuid', newId);
  return newId;
}
