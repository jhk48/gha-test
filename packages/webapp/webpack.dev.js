import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import DotenvWebpackPlugin from 'dotenv-webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

export default merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: path.resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
		historyApiFallback: true,
		port: 8080,
		hot: true,
		compress: true,
		open: true,
		https: true
	},
	plugins: [
		new DotenvWebpackPlugin({
			path: path.resolve(dirname(fileURLToPath(import.meta.url)), '.dev.env')
		})
	]
});
