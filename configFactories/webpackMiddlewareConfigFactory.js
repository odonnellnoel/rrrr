"use strict"

const path = require('path')

module.exports = (basePath, prod) => {
	return {
		contentBase: path.resolve(basePath, 'webroot'),
		publicPath: '/js/',
		inline: true
	}
}