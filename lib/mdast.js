const mdAst = require('markdown-ast');

module.exports = function(markdown) {
  const ast = mdAst(markdown);
  return ast
    .filter(node => node.type === 'list')
    .map(node => node.block[0].text);
};
