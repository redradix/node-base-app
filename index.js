var container = require('./containerConfig');

container.start('webapp', { async: true })
  .then(() => {
    console.log('App started');
  });