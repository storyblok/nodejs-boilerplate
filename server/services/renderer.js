var nunjucksRender = require('koa-nunjucks-render');
var config = require('../config.json');
var requireDir = require('require-dir');

var nunjucksOptions = {
    ext: '.njk',
    noCache: true,
    throwOnUndefined: false,
    filters: requireDir('../helpers/', { recurse: false , camelcase: true}),
};

module.exports = function() {
    return nunjucksRender(__dirname + config.templates.path, nunjucksOptions);
}