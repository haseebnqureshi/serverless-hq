'use strict';

var _  = require('underscore');

var fs = require('fs');

var yaml = require('js-yaml');

var path = require('path');

var filepath = path.resolve(__dirname, '../config.yml');

var configYml = fs.readFileSync(filepath, 'utf8');

var config = yaml.safeLoad(configYml);

process.env = _.extend(process.env, config);

module.exports = config;
