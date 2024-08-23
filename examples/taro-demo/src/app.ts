import { PropsWithChildren, useEffect } from 'react';

import './app.css';

function App({ children }: PropsWithChildren<any>) {
  useEffect(() => {
    wx.onAppRoute((res) => {
      console.log('路由监听', { res });
    });
  }, []);

  // children 是将要会渲染的页面
  return children;
}

export default App;
