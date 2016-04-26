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
And then create the schema (in both, dev and test databases):
`npm run migrate:all`

And insert seed data:
`npm run seed:all`

## Starting the App
Start the server:
`npm start`

Since `npm start` runs the pm2 daemon, make sure you kill it with `npm stop` once you are done. <kdb>Ctrl-C</kbd> after `npm start` does kill the logs tasks, but it does not stop the server process though.

## More stuff
Available npm scripts:

1. `start` - Starts the API server daemon and logs
1. `stop` - Kills server process
1. `test` -  Run server tests
1. `tdd` - "npm run test -- -w",
1. `knex` - "knex --knexfile ./config/knexfile.js",
1. `migrate` - Execute dev migrations on `food` database
1. `migrate:test` - Execute test migrations on `food_test` database
1. `migrate:all` - Execute both dev and test migrations
1. `seed` - Insert seed data on `food` database
1. `seed:test` - Insert seed data on `food_test` database
1. `seed:all` - Insert seed data on both dev and test databases

In addition, the following lifecycle scripts have been added for convenience:

1. `postinstall` - Runs `migrate:all` to execute all new migrations after an update



One of the migrations creates an application user `admin` with password `admin` in the database.
