module.exports = {
    entry: {
        app: ['./index.jsx']
    },
    output: {
        path: '../www/',
        filename: 'app.js'
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.(jsx|js)$/,
            exclude: /(node_modules|bower_components)/,
            loaders: [ 'react-hot', 'babel' ]
        }, {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'css-loader'
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9]*)?$/,
            loader: 'base64-font-loader'
        }]
    }
};
