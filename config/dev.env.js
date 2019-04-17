'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.18.113:8080/"'
  // BASE_API: '"http://qxiao.natapp1.cc/"'
  //BASE_API: '"http://23s662016z.imwork.net"'
  //BASE_API: '"http://23ti245684.imwork.net/"'
});
