var nunjucksRender = require('koa-nunjucks-render');
var nunjucks = require('nunjucks');

// We can override options send directly to nunjucks.
// https://mozilla.github.io/nunjucks/api.html#configure

var nunjucksOptions = {
  ext: '.njk',
  noCache: true,
  throwOnUndefined: false,
  filters: {
    component: function(data) {
      var res = nunjucks.render('components/' + data.component + '.njk', data);
      return new nunjucks.runtime.SafeString(res);
    }
  },
};

module.exports = function() {
  return nunjucksRender(__dirname + '/../views', nunjucksOptions);
}