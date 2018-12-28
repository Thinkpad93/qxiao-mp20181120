'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.18.113:8081/"'
  //BASE_API: '"http://192.168.18.200:8080/"'
  //BASE_API: '"http://120.77.233.111:8081/"'
});
