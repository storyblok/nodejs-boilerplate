var webController = require('./controllers/web');
var renderer = require('./services/renderer');
var minifier = require('koa-html-minifier');
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var config = require('./config.json');


var app = koa();

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// "database"

var posts = [];

// middleware

app.use(logger());
//app.use(components());
app.use(renderer());

// route middleware

app.use(minifier({
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true
}));

app.use(route.get('/', webController.index));
app.use(route.get('/' + config.storyblok.default_language + '/*', webController.show));

app.listen(config.server.port);
console.log('listening on port ' + config.server.port);