const webpack = require('webpack')

const {
  shareAll,
  withModuleFederationPlugin
} = require('@angular-architects/module-federation/webpack')

const webpackConfig = withModuleFederationPlugin({
  shared: shareAll({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  })
})

module.exports = Object.assign(webpackConfig, {
  output: Object.assign(webpackConfig.output, {
    publicPath: '/'
  }),
  plugins: [
    ...webpackConfig.plugins,
    // DISABLE ngDevMode as it is not needed in a remoteEntry
    new webpack.DefinePlugin({
      ngDevMode: 'undefined'
    })
    // END DISABLE ngDevMode as it is not needed in a remoteEntry
  ]
})
