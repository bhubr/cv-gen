const fs = require('fs');
const { join, basename } = require('path');

const templatesDir = join(__dirname, 'templates');
const files = fs.readdirSync(templatesDir);
const templates = files.reduce((carry, f) => {
  const base = basename(f, '.tex');
  const file = join(templatesDir, f);
  const content = fs.readFileSync(file, 'utf8');
  return { ...carry, [base]: content };
}, {});

module.exports = function(id) {
  return templates[id];
};

