const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_ACCESS_POINT: JSON.stringify(
        'https://wdfs7edsah.execute-api.us-west-2.amazonaws.com',
      ),
    }),
  ],
})
