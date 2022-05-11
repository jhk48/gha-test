import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import DotenvWebpackPlugin from 'dotenv-webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

export default merge(common, {
	mode: 'production',
	plugins: [
		new DotenvWebpackPlugin({
			path: path.resolve(dirname(fileURLToPath(import.meta.url)), '.env')
		})
	]
});
