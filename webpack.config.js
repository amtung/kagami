const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/app.js",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  watch: true,
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', `react`]
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\inline.svg$/,
        loader: 'babel!svg-react',
      },
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
