const {join,resolve} = require('path');
const  TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        path: join(__dirname,'../dist'),
        publicPath: '/',
        filename: 'script/[name].[contenthash:5].bundule.js',
        assetModuleFilename: 'images/[name].[contenthash:5][ext]'
    },
    experiments: {
        outputModule: true
    },
    performance: {
        maxAssetSize: 250000,
        maxEntrypointSize: 25000,
        hints: 'warning'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin({
                parallel:true
            }),
            new TerserWebpackPlugin({
                parallel:true
            })
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title:'ycz',
            filename: "index.html",
            template: resolve(__dirname,'../src/index-prod.html'),
            favicon: "./public/favicon.ico"
        })
    ]
}
