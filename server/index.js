var webController = require('./controllers/web');
//var renderer = require('./services/hbsRenderer');
var renderer = require('./services/renderer');
//var components = require('./services/components');
var minifier = require('koa-html-minifier');
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
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
app.use(route.get('/en/*', webController.show));

app.listen(3009);
console.log('listening on port 3009');