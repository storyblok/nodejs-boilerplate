var story = require('../models/story');

module.exports = {
  index: show,
  show: show
}

function* show() {

  var stories = yield [
    story.find.call(this, 'de/home'),
    story.find.call(this, 'de/global/footer'),
    story.find.call(this, 'de/global/header'),
    story.find.call(this, 'de/global/labels')
  ];


  yield this.render('components/root', {
    story: stories[0],
    footer: stories[1],
    header: stories[2],
    labels: stories[3]
  });

  this.body = this.body;
}