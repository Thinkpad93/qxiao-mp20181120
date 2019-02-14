'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://23s662016z.imwork.net"'
  //BASE_API: '"http://23ti245684.imwork.net/"'
});
