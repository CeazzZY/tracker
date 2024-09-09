import { DataType, ISendData } from 'packages/core/src/types';

export function performanceObserverCallback(
  report: (type: DataType, data: ISendData['data']) => void
): PerformanceObserverCallback {
  return function (entryList: PerformanceObserverEntryList) {
    for (const entry of entryList.getEntries()) {
      console.log(entry);
      let data: any = {};

      switch (entry.entryType) {
        case 'navigation':
          data = dealNavigation(entry);
          break;
        case 'render':
          data = dealRender(entry);
          break;
        case 'script':
          data = dealScript(entry);
          break;

        default:
          break;
      }
      report(DataType.PERFORMANCE, data);
    }
  };
}

function dealNavigation(entry: PerformanceEntry) {
  const { name, duration, path, startTime } = entry as any;

  return { name, duration, path, startTime };
}

function dealRender(entry: PerformanceEntry) {
  const { name, duration, path, startTime } = entry as any;

  return { name, duration, path, startTime };
}

function dealScript(entry: PerformanceEntry) {
  const { name, duration, fileList, startTime } = entry as any;

  return { name, duration, fileList, startTime };
}
