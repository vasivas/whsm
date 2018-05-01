const path = require('path');

const webpack = require('webpack');

const {DefinePlugin,DllReferencePlugin,HotModuleReplacementPlugin} = webpack;

const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactLoadablePlugin = require('@7rulnik/react-loadable/webpack').ReactLoadablePlugin;


const create = (root=process.env.PWD) => ({
    name: 'client',
    mode: 'development',
    target: 'web',
    context: path.resolve(root, 'src'),
    entry:{
        client:path.join(root, 'src', 'client','client.tsx')
    },
        // [
        // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        // 'react-hot-loader/patch',
        // path.join(root, 'src', 'client','client.tsx')
    // ],
    output: {
        path: path.join(root, 'dest'),
        filename: "[name].js",
        libraryTarget: 'umd2',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".json"],
        modules: ["node_modules"],
    },
    devtool: 'cheap-inline-module-source-map',
    module: {
        noParse:/\.json$/,
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(root, 'node_modules'),
                include: path.resolve(root, 'src'),
            },
            {
                test: /(\.ts|\.tsx)$/,
                use: 'awesome-typescript-loader',
                include: [path.join(root,'src')],
                exclude: [/node_modules/, /\*\.spec.(ts|tsx)$/]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude:[/node_modules/]
            },
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
});

module.exports = {create};