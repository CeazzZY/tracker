export interface IRouteInfo {
  notFound: boolean;
  openType: 'appLaunch' | 'switchTab' | 'navigateBack' | 'navigateTo';
  path: string;
  query: object;
  renderer: 'webview' | 'Skyline';
  routeEventId: string;
  timeStamp: number;
  webviewId: number;
  [key: string]: any;
}
