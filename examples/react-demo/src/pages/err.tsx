import React, { useState } from 'react';

export default function Err() {
  const [show, setShow] = useState(false);

  function triggerSyncError() {
    const a = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    a.split('/');
  }

  function AsyncError() {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject('error');
      }, 1000);
    });
  }

  async function triggerAsyncError() {
    const res = await AsyncError();
    console.log(res);
  }

  return (
    <div>
      <div onClick={triggerSyncError}>同步错误</div>
      <div onClick={triggerAsyncError}>异步错误</div>
      <div onClick={() => setShow(true)}>资源加载错误</div>
      {show && <img src="https://err/" />}
    </div>
  );
}
