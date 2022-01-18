module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // '@': 'src', // 默认
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'store': '@/store',
        'network': '@/network'
      }
    }
  }
}
