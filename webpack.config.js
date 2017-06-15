var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		main: [
			'babel-polyfill',
			'./src/index.js'
		],
		vendor: ['jquery', 'tether', 'bootstrap']
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'public/bundle.js'
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015', 'stage-1']
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("css-loader")
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader!sass-loader')
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			actions: path.resolve(__dirname, 'src/actions/'),
			reducers: path.resolve(__dirname, 'src/reducers/')
		}
	},
	devServer: {
		disableHostCheck: true,
		historyApiFallback: true,
		contentBase: './'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'public/site.css',
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			tether: 'tether',
			Tether: 'tether',
			"window.Tether": 'tether',
			"window.jQuery": "jquery",
			$: "jquery",
			jQuery: "jquery",
			React: "react"
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'public/vendor.bundle.js', minChunks: Infinity })
	]
};
