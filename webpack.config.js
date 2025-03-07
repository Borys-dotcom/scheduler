const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx', // Your main entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'DayWeekSimpleSchedule', // Changed to a more specific name
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/, // Rule for TypeScript files
        use: 'ts-loader',    // Use ts-loader to compile TypeScript
        exclude: /node_modules/, // Exclude node_modules
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css', // Output CSS file
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  mode: 'production', // Add mode: 'production' or 'development'
};