const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "production",
    target: "node",
    node: {
        __dirname: true,
    },
    externals: [webpackNodeExternals()],
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname + "/docs"),
        filename: "app.build.js",
    },
    // devtool: "inline-source-map",
    devtool: "inline-source-map",
    // devServer: {
    //     open: "http://localhost",
    //     port: 3000,
    //     publicPath: path.resolve(__dirname, "app"),
    //     hot: true,
    // },
    devServer: {
        static: {
            directory: path.join(__dirname, "./build"),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|ejs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "index.html"),
            // template: "./views/index.html",
            filename: "./index.html",
        }),
    ],
};
