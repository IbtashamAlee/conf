const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new CopyPlugin([
        { from: './src/public', to: '' },
      ])
  
  ],
  module: {

  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,
  
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
               {
                 // This loader resolves url() and @imports inside CSS
                 loader: "css-loader",
               },
               {
                 // Then we apply postCSS fixes like autoprefixer and minifying
                 loader: "postcss-loader"
               },
               {
                 // First we transform SASS to standard CSS
                 loader: "sass-loader",
                 options: {
                   implementation: require("sass")
                 }
               }
             ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
               {
                 // After all CSS loaders we use plugin to do his work.
                 // It gets all transformed CSS and extracts it into separate
                 // single bundled file
                 loader: MiniCssExtractPlugin.loader
               }, 
               {
                 loader: "css-loader",
               },
               /* ... Other loaders ... */
             ]
  },

  {
    // Now we apply rule for images
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
           {
             // Using file-loader for these files
             loader: "file-loader",

             // In options we can set different things like format
             // and directory to save
             options: {
               outputPath: 'images'
             }
           }
         ]
  }
]
  }
};