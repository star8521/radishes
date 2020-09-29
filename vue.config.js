module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'music'
      return args
    })
    config.module
      .rule('images')
      .test(/.otf|ttf|png|jpg|gif$/)
      .use('url-loader')
  }
}
