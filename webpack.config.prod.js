var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: {
        app: './client/index.js'
    }, 
    output:{
        filename: 'build/public/bundle.js'
    }, 
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/, 
                loader: 'babel-loader', 
                query: {
                    presets: ['react', 'es2015']
                }
            },  
            {
                test: /\.css$/, 
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
}