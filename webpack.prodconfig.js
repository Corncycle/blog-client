const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      API_ACCESS_POINT: JSON.stringify('https://api.calebstromberg.com'),
    }),
  ],
})
