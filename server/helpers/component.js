var config = require('../config');
var fileExists = require('../lib/file-exists');
var nunjucks = require('nunjucks');

// Component Helper -> includes components from blok element
module.exports = function(data) {
    if (fileExists(__dirname + config.templates.path + '/components/' + data.component + '.njk')) {
        var res = nunjucks.render('components/' + data.component + '.njk', data);
        return new nunjucks.runtime.SafeString(res);
    } else {
        // Error Handeling
        console.log('Component: ' + data.component + '.njk does not exist in components folder!');
    }

    return new nunjucks.runtime.SafeString('');
}