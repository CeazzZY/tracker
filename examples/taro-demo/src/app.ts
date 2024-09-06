import { initWxapp } from '@ceazzzy-tracing/wxapp';
import { PropsWithChildren } from 'react';

import './app.css';

initWxapp({
  dsn: 'http://127.0.0.1:4523/m1/5086603-0-default/tracing',
  appId: 'test',
});

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  return children;
}

export default App;
