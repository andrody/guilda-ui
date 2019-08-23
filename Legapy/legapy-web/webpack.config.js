/*eslint-env node*/
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:80',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        'whatwg-fetch',
        './src/index',
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        port: 80,
        host: '0.0.0.0',
        publicPath: '/',
        historyApiFallback: true,
        disableHostCheck: true,
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
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
                test: /\.scss|css$/,
                use: [
                    'style-loader?sourceMap',
                    'css-loader?sourceMap',
                    'postcss-loader?sourceMap',
                    'resolve-url-loader',
                    'sass-loader?sourceMap',
                ],
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ hash: false, template: './index.hbs' }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/),
        new FaviconsWebpackPlugin({ logo: './favicon.png', inject: true }),
    ],
}
