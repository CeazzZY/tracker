import { _method } from '../utils/global';
import { sendData } from './sendData';

export function initPerformance() {
  _method.observePerformance(sendData.addData.bind(sendData));
}
