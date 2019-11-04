module.exports = {
  modify: (config, { target, dev }, webpack) => {
    /* Ignore so we don't include these in the bundle */
    config.plugins.push(
      new webpack.IgnorePlugin(/^\.\/(?!en)(.+)$/, /validatorjs\/src\/lang/),
    )

    if (config.devServer) {
      config.devServer.host = '0.0.0.0'
    }
  
    return config
  },
}
