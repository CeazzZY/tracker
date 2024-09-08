import { ErrorType, IErr, IErrStack } from '@ceazzzy-tracing/shared';

const STACKMAXLEN = 5;

export function parseSyncErr(err: string) {
  const { msg, errStack } = parseErrStack(err);
  return {
    type: ErrorType.JS,
    errId: getErrId(err),
    msg,
    stack: errStack,
  };
}

export function parseAsyncErr(err: PromiseRejectionEvent): IErr {
  const reason = err.reason;
  const result: IErr = {
    type: ErrorType.PM,
    errId: '',
    msg: '',
  };
  if (typeof reason === 'string') {
    result.errId = getErrId(reason);
    result.msg = reason;

    return result;
  }
  const { stack = '' } = reason;
  if (stack) {
    const { msg, errStack } = parseErrStack(stack);
    result.msg = msg;
    result.stack = errStack;
    result.errId = getErrId(stack);
  }
  return result;
}

export function parseErrStack(stack: string): {
  msg: string;
  errStack: IErrStack[];
} {
  if (!stack) return { msg: '', errStack: [] };
  const rChromeCallStack = /^\s*at\s*([^(]+)\s*\((.+?):(\d+):(\d+)\)$/;
  const rMozlliaCallStack = /^\s*([^@]*)@(.+?):(\d+):(\d+)$/;

  const len = Math.min(STACKMAXLEN, stack.length);

  const stackArr = stack.split('\n');

  const callStackFrameList: IErrStack[] = stackArr
    .slice(1, len)
    .map((str: string) => {
      const chromeErrResult = str.match(rChromeCallStack);
      if (chromeErrResult) {
        return {
          filename: chromeErrResult[2],
          line: chromeErrResult[3], // 错误发生位置的行数
          col: chromeErrResult[4], // 错误发生位置的列数
        };
      }

      const mozlliaErrResult = str.match(rMozlliaCallStack);
      if (mozlliaErrResult) {
        return {
          filename: mozlliaErrResult[2],
          line: mozlliaErrResult[3],
          col: mozlliaErrResult[4],
        };
      }
      console.warn('捕获未知错误栈');
      return {
        filename: '未知',
        line: 'undefine',
        col: 'undefine',
      };
    });

  return { msg: stackArr[0], errStack: callStackFrameList };
}

export function getErrId(errInfo: string): string {
  return errInfo;
}
