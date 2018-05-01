const express=require('express')
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');


const webpackClientConfig = require('./webpack.dev.ssr.client.config').create();
const webpackServerConfig = require('./webpack.dev.ssr.server.config').create();


const app = express();


app.listen(3000);


const webpackConfigAll = [
    webpackClientConfig,
    webpackServerConfig
];
const compiler = webpack( webpackConfigAll );
const clientCompiler = compiler.compilers[ 0 ];
const options = {
    serverSideRender:true,
    stats: {
        colors: true
    }
};


app.use( webpackDevMiddleware( compiler, options ) );
app.use( webpackHotMiddleware( clientCompiler ) );
app.use( webpackHotServerMiddleware( compiler ) );





