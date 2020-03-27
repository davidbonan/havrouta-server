const dotenv = require('dotenv');

require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/transform-runtime'],
});

require('@babel/core').transform('code', {
  plugins: ['@babel/plugin-transform-async-to-generator'],
});
dotenv.config();

// Import the rest of our application.
module.exports = require('./src/server.js');
