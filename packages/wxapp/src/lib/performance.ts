import { IErr } from '@ceazzzy-tracing/shared';
import { DataType, ISendData } from 'packages/core/src/types';

export function performanceObserverCallback(
  report: (type: DataType, data: ISendData['data']) => void
): PerformanceObserverCallback {
  return function (list: PerformanceObserverEntryList) {
    console.log(list.getEntries());
    const data = {} as IErr;
    report(DataType.PERFORMANCE, data);
  };
}
