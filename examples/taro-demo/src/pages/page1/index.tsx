import { View, Image } from '@tarojs/components';
import { useState } from 'react';

export default function Index() {
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
    <View className="index">
      <View onClick={triggerTypeError}>TypeError</View>
      <View onClick={triggerReferenceError}>ReferenceError</View>
      <View onClick={triggerSyntaxError}>SyntaxError</View>
      <View onClick={triggerThrowError}>throwError</View>

      <View onClick={triggerAsyncError}>异步错误</View>
      <View onClick={() => setShow(true)}>资源加载错误</View>
      {show && <Image src="../assets/1.png" />}
    </View>
  );
}
