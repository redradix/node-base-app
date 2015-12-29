var container = require('kontainer-di');

container.register('dbConfig', [], require('./config/knexfile'));
container.register('webConfig', [], require('./config/http'));

//services

//modules
container.register('webapp', ['webConfig'], require('./modules/webapp'));

module.exports = container;