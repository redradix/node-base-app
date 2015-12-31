var container = require('kontainer-di');

container.register('dbConfig', [], require('./config/knexfile'));
container.register('webConfig', [], require('./config/http'));

//db
container.register('db', ['dbConfig'], require('./services/db'));
//services
container.register('userService', ['db'], require('./services/user_service'));
container.register('ingredientService', ['db'], require('./services/ingredient_service'));

//modules
container.register('webapp', ['webConfig'], require('./modules/webapp'));
container.register('userApi', ['webapp', 'userService', 'webConfig'], require('./modules/user_api'));

module.exports = container;