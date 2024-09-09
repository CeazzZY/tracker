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
  //   const t: any = performance.getEntriesByType('navigation')[0];

  //   times.tti = t.domInteractive - t.fetchStart; // 首次可交互时间

  //   times.ready = t.domContentLoadedEventEnd - t.fetchStart; // HTML加载完成时间

  //   times.loadon = t.loadEventStart - t.fetchStart; // 页面完全加载时间

  //   times.firstbyte = t.responseStart - t.domainLookupStart; // 首包时间

  //   times.dns = t.domainLookupEnd - t.domainLookupStart; // dns查询耗时

  //   times.appcache = t.domainLookupStart - t.fetchStart; // dns缓存时间

  //   times.tcp = t.connectEnd - t.connectStart; // tcp连接耗时

  //   times.ttfb = t.responseStart - t.requestStart; // 请求响应耗时

  //   times.trans = t.responseEnd - t.responseStart; // 内容传输耗时

  //   times.dom = t.domInteractive - t.responseEnd; // dom解析耗时

  //   times.res = t.loadEventStart - t.domContentLoadedEventEnd; // 同步资源加载耗时

  //   times.ssllink = t.connectEnd - t.secureConnectionStart; // SSL安全连接耗时

  //   times.redirect = t.redirectEnd - t.redirectStart; // 重定向时间

  //   times.unloadTime = t.unloadEventEnd - t.unloadEventStart; // 上一个页面的卸载耗时
}
