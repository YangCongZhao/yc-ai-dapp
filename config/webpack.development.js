const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path')
const port = 3000;
module.exports = {
    devServer: {
      historyApiFallback:true,
      static: resolve(__dirname,'../dist'),
        hot:true,
        port
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            favicon: "./public/favicon.ico",
            template: resolve(__dirname,'../src/index-dev.html')
        })
    ]
}
