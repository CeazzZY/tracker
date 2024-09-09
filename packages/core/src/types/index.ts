import { IErr, IPv, IPvDuring } from '@ceazzzy-tracing/shared';

export interface ISendData {
  appId: string;
  uid: string;
  ip: string;
  time: number;
  type: DataType;
  data: IErr | IPv | IPvDuring;
}

export enum DataType {
  ERROR = 'error',
  REJECTED = 'rejected',
  PV = 'pv',
  PVDURING = 'pv-during',
  EVENT = 'event',
  PERFORMANCE = 'performance',
}
