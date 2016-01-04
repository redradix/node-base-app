var container = require('kontainer-di');

container.register('dbConfig', [], require('./config/knexfile'));
container.register('webConfig', [], require('./config/http'));

//db
container.register('db', ['dbConfig'], require('./services/db'));

//*** SERVICES ****
//JSON Web Token service
container.register('jwtService', ['webConfig'], require('./services/jwt_service'));
//Express security
container.register('httpSecurity', ['jwtService', 'webConfig'], require('./services/http_security'));

//Validation schemas
container.register('schemas', [], require('./core/schemas'));
//Validation Service
container.register('validationService', ['schemas'], require('./services/validation_service'));

//User Service
container.register('userService', ['db'], require('./services/user_service'));
//Ingredient Service
container.register('ingredientService', ['db'], require('./services/ingredient_service'));

//**** MODULES *****
//Express app
container.register('webapp', ['webConfig'], require('./modules/webapp'));
//User REST API - register, login, logout
container.register('userApi', ['webapp', 'userService', 'httpSecurity', 'jwtService', 'webConfig'], require('./modules/user_api'));
//Ingredient REST API
//Dish REST API
//Order REST API
//

module.exports = container;