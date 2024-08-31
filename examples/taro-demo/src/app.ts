import { initWxapp } from '@ceazzzy-tracing/wxapp';
import { PropsWithChildren } from 'react';

import './app.css';

initWxapp({});

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  return children;
}

export default App;
