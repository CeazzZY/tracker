export enum EVENTTYPES {
  ERROR = 'error',
  CONSOLEERROR = 'consoleError',
  UNHANDLEDREJECTION = 'unhandledrejection',
  CLICK = 'click',
  BEFOREUNLOAD = 'beforeunload',
  HASHCHANGE = 'hashchange',
  HISTORYPUSHSTATE = 'history-pushState',
  HISTORYREPLACESTATE = 'history-replaceState',
  POPSTATE = 'popstate',
  ROUTECHANGE = 'route-change',
}

/**
 * @param FCP 灰屏时长
 * @param LCP 最大内容绘制时长
 * @param FID 首次输入延迟
 * @param CLS 累计布局偏移
 * @param NT navigation-timing
 * @param RF resource-flow
 */

export enum PerformanceMetricsName {
  FCP = 'FCP',
  LCP = 'LCP',
  FID = 'FID',
  CLS = 'CLS',
  NT = 'navigationTiming',
  RF = 'resource-flow',
  CD = 'cache-data',
}
