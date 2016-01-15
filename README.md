# Node base app - Restaurant API + user security
Node.js version >=4 required. If you have `nvm` installed use `nvm use` to select node.js version from `.nvmrc` file.
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
And then create the schema:
```npm run migrate```

And insert seed data:
```npm run seed```

## Starting the App
Start the server:
```npm start```

## More stuff
Available npm scripts:

1. `npm run migrate:dev` - Execute dev migrations on `food` database
2. `npm run migrate:test` - Execute test migrations on `food_test` database
3. `npm run migrate` - Execute both dev and test migrations
4. `npm run seed` - Insert seed data in the DB
5. `npm test` - Run server tests
6. `npm start` - Applies migrations and starts the API server daemon and logs
7. `npm run watch` - Applies migrations and starts the API server daemon
8. `npm run logs` - Shows server process' logs
8. `npm run stop` - Kills server process


One of the migrations creates an application user `admin` with password `admin` in the database.
