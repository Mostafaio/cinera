const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['source-map-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: 'css-loader',
            },
        ],

        // parser: {
        //     javascript: {
        //         wrappedContextRegExp: /.*/,
        //         wrappedContextRecursive: true
        //     }
        // }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'html'],
        fallback: {
            "fs": false,
            "path": false
        },
    },
    output: {
        // filename: 'bundle.js',
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, ''),
        },
        historyApiFallback: true,
        compress: true,
        port: 9000,
    },
};
