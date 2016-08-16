var url = require('url');
var request = require('co-request');
var cache = require('memory-cache');
var config = require('../config.json');

var getOptions = function(id, version) {
  return {
    url: 'https://api.storyblok.com/v1/cdn/spaces/' + config.storyblok.space_id + '/stories/' + id,
    qs: {
      token: config.storyblok.token,
      version: version
    },
    headers: { 'User-Agent': 'nodejs' }
  };
}

module.exports = {
  find: function *(slugOrId) {
    var version = this.request;
    var res = cache.get(slugOrId);
    var query = url.parse(this.request.url, true).query;
    var version = '_storyblok' in query ? 'draft' : 'published';

    if (!res || version === 'draft') {
      var response = yield request(getOptions(slugOrId, 'published'));
      res = JSON.parse(response.body);

      if (version == 'published') {
        cache.put(slugOrId, res, 10000);
      }
    }

    return res.story;
  }
}