const path = require('path');
// const sassLoader = require.resolve("../../lib/loader");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [{
          test: /\.css$/,
          use:[
              'style-loader', // creates style nodes from JS strings
              'css-loader' // translates CSS into CommonJS
          ]
      },
      {
        test: /\.scss$/,
            use: [{loader: 'style-loader'},
                  {loader: 'css-loader'},
                  {loader: 'sass-loader', options:
                            {includePaths: [path.resolve(__dirname, "../scss/includePath")]}}
                ]
            // "style-loader", // creates style nodes from JS strings
            // "css-loader", // translates CSS into CommonJS
            // "sass-loader" // compiles Sass to CSS, using Node Sass by default
    }
    // ,{
    //     test: /\.less$/,
    //     use:[{loader: 'style-loader'},{loader: 'css-loader'},{loader: 'less-loader', options: {paths: [path.resolve(__dirname, 'node_modules')]}}] 
    //   }
    ]
  }
};
