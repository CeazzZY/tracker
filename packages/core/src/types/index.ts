export interface IUser {
  appId: string;
  ip: string;
}

export interface IData {
  userInfo: IUser;
}

export interface IPerformance {
  userInfo: IUser;
}
