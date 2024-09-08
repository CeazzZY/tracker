import { AnyFun, IErr, Method } from '@ceazzzy-tracing/shared';
import { IRouteInfo } from '../types';
import { parseAsyncErr, parseSyncErr } from './err';

class WxMethod extends Method {
  performance: WechatMiniprogram.Performance = wx.getPerformance();
  send(url: string, data: any) {
    return wx.request({
      url,
      method: 'POST',
      data: JSON.stringify(data),
      header: {
        'Content-Type': 'application/json',
      },
    });
  }

  getCurrentUrl(): string {
    return '';
  }

  listenRouteChange(callback: AnyFun) {
    //@ts-ignore
    wx.onAppRoute((data: IRouteInfo) => {
      const { path, timeStamp } = data;
      callback(path, timeStamp);
    });
  }

  listenError(callback: (err: IErr) => void) {
    wx.onError((err: string) => {
      const errInfo = parseSyncErr(err);
      callback(errInfo);
    });
  }

  listenUnhandledRejection(callback: (err: IErr) => void) {
    wx.onUnhandledRejection(
      (err: WechatMiniprogram.OnUnhandledRejectionCallbackResult) => {
        const errInfo = parseAsyncErr(err);
        callback(errInfo);
      }
    );
  }

  listenClick(): void {}

  listenPopstateChange(): void {}

  listenHistoryPushState(): void {}

  listenHistoryReplaceState(): void {}

  listenBeforeunload(): void {}

  listenHashChange(): void {}
}

export default WxMethod;
