var container = require('./containerConfig');

container.start('userApi', { async: true })
  .then(() => {
    console.log('App started');
  });