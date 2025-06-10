const merge = require("webpack-merge");
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development';
const { resolve } = require('path');
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const webpackBaseConfig = {
    entry:{
        main:resolve('src/index.ts')
    },
    output:{
        path:resolve(process.cwd(),'dist'),
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
            }
        ]
    }




}
module.exports = merge.default(webpackBaseConfig, _mergeConfig);
/*

webpack5之后加入了 prepack。有一个自己的静态运行时，最终会保留执行的结果
很多的loading会破坏prepack

esbuild是用go写的 它有自己的js mini的方式 破坏了prepack。vite使用了esbuild破坏了 所以不建议用vite
swc是rust写的。建议用。

 */

