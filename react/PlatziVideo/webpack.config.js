const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // Resolver las extensiones que usaremos para el proyecto
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // Reglas necesarias para el proyecto
    module: {
        rules: [
            {
                // regexp que permite identificar los archivos .js y .jsx
                test: /\.(js|jsx)$/,
                // exclusion de node_modules
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
                
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // donde esta ubicado el template que tenemos
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css'
        })
    ]
}