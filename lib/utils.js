const { readdirSync, readFileSync } = require('fs');
const { join, basename } = require('path');

function readFile(file) {
  return readFileSync(file, 'utf8');
}

function readJsonFile(file) {
  return JSON.parse(readFile(file));
}


function readFiles(dir, ext) {
  const files = readdirSync(dir);
  const contents = files.reduce((carry, f) => {
    const base = basename(f, `.${ext}`);
    const file = join(dir, f);
    const content = readFile(file);
    return { ...carry, [base]: content };
  }, {});
  return contents;
}

module.exports = {
  readFiles,
  readFile,
  readJsonFile
}