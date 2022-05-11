import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	entry: path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'index.tsx'),
	output: {
		path: path.resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
		alias: {
			'@src': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
			'@components': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'components'),
			'@pages': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'pages'),
			'@assets': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'assets'),
			'@constants': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'constants'),
			'@styles': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'styles'),
			'@hooks': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'hooks'),
			'@types': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'types', 'index.ts'),
			'@api': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'api'),
			'@utils': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'utils'),
			'@configs': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'configs'),
			'@lib': path.resolve(dirname(fileURLToPath(import.meta.url)), 'src', 'lib')
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				exclude: [/\.module\.css$/i, /node_modules/]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: {
						list: [
							{
								tag: 'link',
								attribute: 'href',
								type: 'src'
							}
						]
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(dirname(fileURLToPath(import.meta.url)), 'src/index.html')
		})
	]
};
