export interface InitOptions {
  dsn: string;
  appName: string;
  useID: string;
}

export interface ITracker {
  eventBus: any;
}
