var story = require('../models/story');
var config = require('../config');

module.exports = {
  index: show,
  show: show
}

function* show() {

  var stories = yield [
    story.find.call(this, config.storyblok.default_language + '/home'),
    story.find.call(this, config.storyblok.default_language + '/global/footer'),
    story.find.call(this, config.storyblok.default_language + '/global/header'),
    story.find.call(this, config.storyblok.default_language + '/global/labels')
  ];


  yield this.render('components/root', {
    story: stories[0],
    footer: stories[1],
    header: stories[2],
    labels: stories[3]
  });

  this.body = this.body;
}