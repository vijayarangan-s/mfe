const {merge} = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFedrationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common")
const packageJson = require("../package.json")

const devConfig = {
    mode: "development",
    devServer: {
        port: "8081",
        historyApiFallback: {
            index: "index.html"
        }
    },
    plugins: [
        new ModuleFedrationPlugin({
            name:"marketing",
            filename: "remoteEntry.js",
            exposes:{
                "./MarketingApps": "./src/bootstrap"
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]

}

module.exports = merge(commonConfig, devConfig)