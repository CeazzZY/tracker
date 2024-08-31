export interface ISendData {
  appId: string;
  uid: string;
  ip: string;
  time: number;
  type: 'error' | 'rejected' | 'assets' | 'pv' | 'pv-during' | 'event';
  data: IData;
}

/**
 *"error","rejected","assets","pv","uv","time","event"
 */
export interface IData {
  id: string;
}
