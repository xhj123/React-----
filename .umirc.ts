import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {}, // ant-design-pro 的布局
  // 路由配置 layouts为公共部分
  routes: [
    { exact: false,path:'/',component:'@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' }
      ]
    }
  ],
  // 数据管理配置
  dva: {
    immer: true,
    hmr: true // 启用热更新
  },
  chainWebpack(memo) {
    memo.module
      .rule('media')
      .test(/\.(mp3|4)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
  }
});
