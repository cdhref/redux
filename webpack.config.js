const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: "word-play-setting",
    mode: "development",
    devtool: "eval",
    // 해당 확장자에 해당하는 entry 파일을 스캔 함
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // 묶을 파일
    entry: {
        app: ['./redux'],
    },
    module: {
        rules: [],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin(),
    ],
    output: {
        // webpack으로 생성 된 파일이 저장 될 경로 / 파일명
        path: __dirname,
        filename: 'app.js',
        publicPath: '/',
    },
    devServer:{
        historyApiFallback: true,
        publicPath: '/',
        hot: true,
    },
};