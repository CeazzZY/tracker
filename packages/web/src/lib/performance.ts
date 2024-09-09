import { AnyObj, isValidKey } from '@ceazzzy-tracing/shared';
import { DataType, ISendData } from 'packages/core/src/types';

const performanceEntryAttrs = {
  initiatorType: '',
  transferSize: 0,
  encodedBodySize: 0,
  decodedBodySize: 0,
  duration: 0,
  redirectStart: 0,
  redirectEnd: 0,
  startTime: 0,
  fetchStart: 0,
  domainLookupStart: 0,
  domainLookupEnd: 0,
  connectStart: 0,
  connectEnd: 0,
  requestStart: 0,
  responseStart: 0,
  responseEnd: 0,
  workerStart: 0,
};

export function performanceObserverCallback(
  report: (type: DataType, data: ISendData['data']) => void
): PerformanceObserverCallback {
  return function (entryList: PerformanceObserverEntryList) {
    for (const list of entryList.getEntries()) {
      let data: any;
      switch (list.entryType) {
        case 'navigation':
          data = dealNavigationTime(list as PerformanceNavigationTiming);
          break;
        case 'resource':
          data = dealResource(list as PerformanceResourceTiming);
          break;

        default:
          console.warn('获取未知性能 entryType');
          break;
      }
      if (data) report(DataType.PERFORMANCE, data);
    }
  };
}

function dealNavigationTime(entry: PerformanceNavigationTiming) {
  const {
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
    secureConnectionStart,
    requestStart,
    responseStart,
    responseEnd,
    domInteractive,
    domContentLoadedEventEnd,
    loadEventStart,
    fetchStart,
    redirectEnd,
    redirectStart,
    unloadEventEnd,
    unloadEventStart,
  } = entry;
  const times: AnyObj = {};

  times.tti = domInteractive - fetchStart; // 首次可交互时间

  times.ready = domContentLoadedEventEnd - fetchStart; // HTML加载完成时间

  times.loadon = loadEventStart - fetchStart; // 页面完全加载时间

  times.firstbyte = responseStart - domainLookupStart; // 首包时间

  times.dns = domainLookupEnd - domainLookupStart; // dns查询耗时

  times.appcache = domainLookupStart - fetchStart; // dns缓存时间

  times.tcp = connectEnd - connectStart; // tcp连接耗时

  times.ttfb = responseStart - requestStart; // 请求响应耗时

  times.trans = responseEnd - responseStart; // 内容传输耗时

  times.dom = domInteractive - responseEnd; // dom解析耗时

  times.res = loadEventStart - domContentLoadedEventEnd; // 同步资源加载耗时

  times.ssllink = connectEnd - secureConnectionStart; // SSL安全连接耗时

  times.redirect = redirectEnd - redirectStart; // 重定向时间

  times.unloadTime = unloadEventEnd - unloadEventStart; // 上一个页面的卸载耗时

  return times;
}

function dealResource(entry: PerformanceResourceTiming) {
  const observerTypeList = ['img', 'script', 'link', 'audio', 'video', 'css'];

  const { initiatorType = '' } = entry;

  if (observerTypeList.indexOf(initiatorType.toLowerCase()) < 0) return;

  const value: AnyObj = {};
  Object.keys(performanceEntryAttrs).forEach((attr) => {
    if (isValidKey(attr, entry)) {
      value[attr] = entry[attr];
    }
  });

  return value;
}
