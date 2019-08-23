const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
        app: ['babel-polyfill', './src/index'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'assets/[name].[hash].js',
        chunkFilename: 'assets/[name].[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['es2015', { modules: false }],
                        'stage-0',
                        'react',
                    ],
                    plugins: [
                        'transform-async-to-generator',
                        'transform-decorators-legacy',
                    ],
                },
            },
            {
                test: /\.scss|css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                    ],
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            query: {
                                name: 'assets/[hash].[ext]',
                                hash: 'sha512',
                                digest: 'hex',
                            },
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: true,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            mozjpeg: {
                                progressive: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new UglifyJsPlugin({
            sourceMap: true,
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
            ignoreOrder: false,
        }),
        new FaviconsWebpackPlugin({ logo: './favicon.png', inject: true }),
        new HtmlWebpackPlugin({
            hash: false,
            template: './index.hbs',
        }),
    ],
}
