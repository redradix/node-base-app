# Node base app - Restaurant API + user security
Node.js version >=4 required.
## Dependencies
- Local project dependencies (`npm install`)
- Global dependencies: `mocha` for running tests, `knex` for running migrations

## Database installation
Install MySQL (on Mac, using homebrew is recommended, `brew install mysql`) and start the database server (`mysql.server start`)

Create the databases (dev and test) and the application DB user from MySQL CLI (`mysql -u root`):
```
CREATE DATABASE food;
CREATE DATABASE food_test;
GRANT ALL PRIVILEGES ON food.* TO 'food'@'localhost' IDENTIFIED BY 'food';
GRANT ALL PRIVILEGES ON food_test.* TO 'food'@'localhost' IDENTIFIED BY 'food';
```

## Migrations && Seeds
Build the DB schema by executing migrations.
Insert seed data
Available npm scripts:

1. `npm run migrate:dev` - Execute dev migrations on `food` database
2. `npm run migrate:test` - Execute test migrations on `food_test` database
3. `npm run seed` - Insert seed data in the DB
3. `npm test` - Run server tests
4. `npm start` - Start the app


One of the migrations creates an application user `admin` with password `admin` in the database.
