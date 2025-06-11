const merge = require("webpack-merge");
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development';
const _modeflag = _mode === 'production';
const { resolve } = require('path');
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBaseConfig = {
    entry:{
        main:resolve('src/index.tsx')
    },
    output:{
        publicPath:'/',
        filename:'script/[name].bundle.js',
        //asset/resource 编译的都放到images里面
        assetModuleFilename:'images/[name].[ext]'
    },
    module:{
        rules:[
        {
            test:/\.(ts|tsx)$/,
            exclude:/(node_modules)/,
            use:{
                loader:'swc-loader'
            }
        },{
            test:/\.(eot|woff|ttf|svg|png|jpg)$/,
            type:"asset/resource"
            },
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{importLoaders:1},
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            ignoreOrder: false,
        }),

        /*
             hash index.r456hgghh.js    整个网站尾缀都用一个
            chunkhash
                index.5656.js。   js css 用一个hash 一个变了其中另一个也变。
                index.5656.css
            contenthash。 常用 hash独立 互不干扰
                    index.5656.js  自己有一个hash。 js变得的话改自己
                    index.fgfg.css css自己有一个hash。css变了改自己
        |
         */
    ]
}
module.exports = merge.default(webpackBaseConfig, _mergeConfig);
/*

webpack5之后加入了 prepack。有一个自己的静态运行时，最终会保留执行的结果
很多的loading会破坏prepack

esbuild是用go写的 它有自己的js mini的方式 破坏了prepack。vite使用了esbuild破坏了 所以不建议用vite
swc是rust写的。建议用。


mvc
solid
函数试
ioc node开发

 */

