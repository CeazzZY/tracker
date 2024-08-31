import { ErrorType, IErr, IErrStack } from '@ceazzzy-tracing/shared';

const STACKMAXLEN = 4;

export function parseError(
  event: ErrorEvent | Event | PromiseRejectedResult
): IErr {
  if ((event as PromiseRejectedResult).reason !== undefined)
    return dealPM(event as PromiseRejectedResult);
  if (!(event instanceof ErrorEvent)) return dealRS(event as Event);
  return dealJS(event as ErrorEvent);
}

function dealRS(event: Event): IErr {
  const { target } = event;
  if (target instanceof HTMLElement) {
    if (target.nodeType === 1) {
      const result = {
        msg: target.nodeName.toLowerCase(),
        type: ErrorType.RS,
        filename: '',
        errId: '',
      };
      switch (target.nodeName.toLowerCase()) {
        case 'link':
          result.filename = (target as HTMLLinkElement).href;
          break;
        default:
          result.filename =
            (target as HTMLImageElement).currentSrc ||
            (target as HTMLScriptElement).src;
      }
      result.errId = getErrId(result.filename);
      return result;
    }
  }
  console.warn('捕获未知资源错误');
  return {
    type: ErrorType.RS,
    msg: '未知资源错误',
    errId: 'undefinedErr',
  };
}

function dealPM(event: PromiseRejectedResult): IErr {
  if (event.reason.message) {
    //js报错
    const { message = '', stack = '' } = event.reason;

    return {
      type: ErrorType.JS,
      errId: getErrId(stack),
      msg: message,
      stack: parseStack(stack, message),
    };
  }

  return {
    type: ErrorType.PM,
    msg: event.reason,
    errId: getErrId(event.reason),
  };
}

function dealJS(event: ErrorEvent): IErr {
  const { message = '', stack = '' } = event.error;

  return {
    type: ErrorType.JS,
    errId: getErrId(stack),
    msg: message,
    stack: parseStack(stack, message),
  };
}

// function dealCS(event: ErrorEvent): IErr {}

function getErrId(err: string): string {
  return err;
}

function parseStack(stack: string, message: string): IErrStack[] {
  if (!stack) return [];
  const rChromeCallStack = /^\s*at\s*([^(]+)\s*\((.+?):(\d+):(\d+)\)$/;
  const rMozlliaCallStack = /^\s*([^@]*)@(.+?):(\d+):(\d+)$/;
  console.log(stack);

  const callStackStr = stack.replace(new RegExp(`^[\\w\\s:]*${message}\n`), '');
  const len = Math.max(STACKMAXLEN, callStackStr.length);

  const callStackFrameList = callStackStr
    .split('\n')
    .slice(0, len)
    .map((str: string) => {
      console.log(str);
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

  return callStackFrameList;
}
