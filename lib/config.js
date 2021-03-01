const { resolve } = require('path');

const dataDirName = process.env.DATA_DIR || 'sample-data';
const dataDir = resolve(__dirname, '..', dataDirName)

module.exports = { dataDir };
