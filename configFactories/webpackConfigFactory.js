"use strict"

const webpack = require('webpack')
const path = require('path')

module.exports = (basePath, prod) => {
	
	const extraPlugins = prod ? [
		new webpack.DefinePlugin({
  			'process.env': {
    			NODE_ENV: JSON.stringify('production')
  			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	] : [

	]

	return {
		devtool: prod ? false : 'source-map',
		entry: [
			path.resolve(basePath, 'src/index.jsx'),
			'webpack-hot-middleware/client?path=/__webpack_hmr'
		],
		output: {
			path: path.resolve(basePath, 'dist'),
			filename: 'bundle.js',
			publicPath: '/static/js/'
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					include: path.resolve(basePath, 'src'),
					use: {
						loader: 'react-hot-loader'
					}
				},
				{
					test: /\.jsx?$/,
					include: path.resolve(basePath, 'src'),
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'stage-0', 'react']
						}
					}
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			...extraPlugins
		]
	}
}
