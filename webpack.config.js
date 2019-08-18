'use strict';

const path = require('path');

module.exports = {
	mode: 'production',

	entry: {
		index: path.resolve('./content-scripts/index.js')
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve('./content-scripts/dist')
	},

	devtool: '#source-map',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	}
};
