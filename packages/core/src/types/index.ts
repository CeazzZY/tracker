export interface ISendData {
  appId: string;
  uid: string;
  ip: string;
  time: number;
  type: DataType;
  data: IData;
}

export enum DataType {
  ERROR = 'error',
  REJECTED = 'rejected',
  PV = 'pv',
  PVDURING = 'pv-during',
  EVENT = 'event',
}

export interface IData {
  id: string;
}
