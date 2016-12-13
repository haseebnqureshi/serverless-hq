'use strict';

var _  = require('underscore');

var fs = require('fs');

var yaml = require('js-yaml');

var path = require('path');

var filepath = path.resolve(__dirname, '..', 'config.yml');

var contents = fs.readFileSync(filepath, 'utf8');

var config = yaml.safeLoad(contents);

//load any config variables into the process.env object
process.env = _.extend(process.env, config);

//and return our master config json
module.exports = config;
