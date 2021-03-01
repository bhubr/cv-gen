const { join } = require('path');
const { readFiles } = require('./utils');
const { dataDir } = require('./config');

const expDir = join(dataDir, 'experiences');

function readExperiences() {
  const exps = readFiles(expDir, 'md');
  return Object.keys(exps)
    .sort((a, b) => {
      if (a < b) return 1
      if (a > b) return -1
      return 0
    })
    .map(k => exps[k])
}

module.exports = readExperiences;
