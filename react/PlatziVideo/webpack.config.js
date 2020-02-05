const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

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
                // uso del babel-loader
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}