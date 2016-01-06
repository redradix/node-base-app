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

//Data acces services
container.register('userService', ['db', 'validationService'], require('./services/user_service'));
container.register('ingredientService', ['db', 'validationService'], require('./services/ingredient_service'));
container.register('dishService', ['db', 'validationService'], require('./services/dish_service'));
container.register('orderService', ['db', 'validationService'], require('./services/order_service'));

//**** MODULES *****
//Express app
container.register('webapp', ['webConfig'], require('./modules/webapp'));

//*** API Controllers **/
container.register('sessionController', ['webapp', 'userService', 'httpSecurity', 'jwtService', 'webConfig'], require('./modules/api/session'));
container.register('ingredientController', ['webapp', 'ingredientService', 'httpSecurity'], require('./modules/api/ingredient'));
container.register('dishController', ['webapp', 'dishService', 'httpSecurity'], require('./modules/api/dish'));
container.register('orderController', ['webapp', 'orderService', 'httpSecurity'], require('./modules/api/order'));

module.exports = container;