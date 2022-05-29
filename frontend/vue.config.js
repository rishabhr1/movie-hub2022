const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../views'),
  devServer: {
    proxy : "http://localhost:4001"
  },
  }

