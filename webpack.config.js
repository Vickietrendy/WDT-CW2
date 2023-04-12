const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { EnvironmentPlugin } = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const pages = ['index', 'detail', 'about']
// require("dotenv").config
module.exports = () => {

    return {
        entry: pages.reduce((config, page) => {
            config[page] = `./src/assets/js/${page}.js`;
            return config;
          }, {}),
          resolve: {
        fallback: {
            "fs": false,
            "os": false,
            "path": false
          },
          },

        plugins :[].concat(
            pages.map(
                (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    template: `./src/${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                })
            ),
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled"
        }),
        new Dotenv(),
        ),      
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './dist'),
            clean: true,
        },
        module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    devServer : {
        static: './dist',
        port: 9000
    },
    mode: 'production'
    }
}