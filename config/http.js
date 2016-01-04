var httpConfig = {
  //express server
  host: '127.0.0.1',
  port: 8001,
  //security
  jwtsecret: 's3cr3ts11ff',
  jwtexpiration: '24h'
};

module.exports = httpConfig;