const path = require('path');

const webpack = require('webpack');


const create = (root=process.env.PWD) => ({
    name: 'server.dev',
    mode: 'development',
    target: 'node',
    context: path.join(root, 'src'),
    entry: {
        server: path.join(root, 'src', 'server', 'server.tsx')
    },
    output: {
        path: path.join(root, 'dest'),
        filename: "[name].js",
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".json"],
        modules: ["node_modules"],
        alias: {
        },
    },
    devtool: 'source-map',
    externals: [
    ],
    module: {
        noParse:/\.json$/,
        rules: [
            {
                test: /(\.ts|\.tsx)$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {}
                },
                exclude: [/node_modules/]
            },
        ]
    },
});

module.exports = {create};