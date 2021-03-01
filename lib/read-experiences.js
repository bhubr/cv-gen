const { join } = require('path');
const { readFiles } = require('./utils');
const { dataDir } = require('./config');

function readExperiences(dir) {
  const subDir = join(dataDir, dir);
  const entries = readFiles(subDir, 'md');
  return Object.keys(entries)
    .sort((a, b) => {
      if (a < b) return 1
      if (a > b) return -1
      return 0
    })
    .map(k => entries[k])
}

module.exports = readExperiences;
