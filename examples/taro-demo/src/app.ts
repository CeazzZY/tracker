import { PropsWithChildren } from 'react';

import './app.css';

wx.onAppRoute((v) => {
  console.log(v);
});

wx.onError((err) => {
  const errspit = err.split(/\n/) || [];
  console.log(errspit);
  let src;
  let line;
  let errs = err.match(/\(.+?\)/);
  if (errs && errs.length) errs = errs[0];
  errs = errs.replace(/\w.+js/g, ($1) => {
    src = $1;
    return '';
  });
  errs = errs.split(':');
  if (errs && errs.length > 1) line = parseInt(errs[1] || 0);
  const col = parseInt(errs[2] || 0);
  console.log({
    col: col,
    line: line,
    name: src,
    msg: `${errspit[0]};${errspit[1]};${errspit[2]};`,
    type: 'js',
  });
});

wx.onUnhandledRejection((v) => {
  console.log(v);
});

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  return children;
}

export default App;
