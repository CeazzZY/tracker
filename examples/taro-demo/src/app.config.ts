export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/page1/index',
    'pages/page2/index',
    'pages/page3/index',
    'pages/about/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '主页',
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
      },
    ],
  },
});
