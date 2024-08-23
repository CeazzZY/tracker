import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.css';

export default function Index() {
  return (
    <View className="index">
      <Text>Hello</Text>
      <View
        onClick={() => {
          Taro.navigateTo({ url: '/pages/page1/index' });
        }}
      >
        to page1
      </View>
    </View>
  );
}
