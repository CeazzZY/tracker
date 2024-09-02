import { DataType, ISendData } from '../types';
import { _support, _method } from '../utils/global';
import { options } from './options';

const SENDMAXLEN = 10;

class SendData {
  private timerID: ReturnType<typeof setTimeout> | undefined;
  private eventList: ISendData[] = [];
  private report;
  constructor() {
    this.report = _method.send;
  }

  send() {
    const len = Math.min(this.eventList.length, SENDMAXLEN);
    const sendList = this.eventList.splice(0, len);
    this.report(options.dsn, sendList);

    if (this.eventList.length !== 0) {
      this.timerID = setTimeout(() => {
        this.send();
        this.timerID = undefined;
      }, 5000);
    }
  }

  addData(type: DataType, data: ISendData['data']) {
    const { appId, userId, ip } = options;
    const event: ISendData = {
      appId,
      uid: userId,
      ip,
      time: new Date().getTime(),
      type,
      data,
    };
    this.eventList.push(event);
    if (this.timerID) return;
    this.timerID = setTimeout(() => {
      this.send();
      this.timerID = undefined;
    }, 5000);
  }
}

export let sendData: SendData;

export function initSendData() {
  _support.sendData = new SendData();
  sendData = _support.sendData;
}
