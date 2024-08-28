import { View, Text } from '@tarojs/components';

export default function Index() {
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
    <View className="index">
      <Text onClick={triggerSyncError}>代码同步错误</Text>
      <Text onClick={triggerAsyncError}>代码异步错误</Text>
    </View>
  );
}
