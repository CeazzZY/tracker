import { IErr } from '@ceazzzy-tracing/shared';

export interface ISendData {
  appId: string;
  uid: string;
  ip: string;
  time: number;
  type: DataType;
  data: IErr;
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
