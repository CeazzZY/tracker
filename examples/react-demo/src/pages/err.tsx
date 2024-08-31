import React, { useState } from 'react';

export default function Err() {
  const [show, setShow] = useState(false);

  function triggerTypeError() {
    const a = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    a.split('/');
  }

  function triggerReferenceError() {
    console.log(a);
  }

  function triggerSyntaxError() {
    consol(1);
  }

  function triggerThrowError() {
    throw new Error('error');
  }

  function AsyncError() {
    return new Promise((_, reject) => {
      console.log(a);
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
      <div onClick={triggerTypeError}>TypeError</div>
      <div onClick={triggerReferenceError}>ReferenceError</div>
      <div onClick={triggerSyntaxError}>SyntaxError</div>
      <div onClick={triggerThrowError}>throwError</div>

      <div onClick={triggerAsyncError}>异步错误</div>
      <div onClick={() => setShow(true)}>资源加载错误</div>
      {show && <img src="../assets/1.png" />}
    </div>
  );
}
