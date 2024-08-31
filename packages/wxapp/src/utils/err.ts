import { IErr } from '@ceazzzy-tracing/shared';

export function parseErr(err: string): IErr {
  const errSpit = err.split(/\n/) || [];

  const errPositionArr = err.match(/\(.+?\)/);

  let filename = '';
  let errPosition = '';

  if (errPositionArr && errPositionArr.length) errPosition = errPositionArr[0];
  const coordinate = errPosition.replace(/\w.+js/g, (name) => {
    filename = name ? name : '';
    return '';
  });
  const [line, col] = coordinate.slice(2, -1).split(':');

  return {
    col,
    line,
    filename,
    msg: `${errSpit[1]}`,
  };
}
