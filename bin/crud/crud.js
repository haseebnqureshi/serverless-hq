'use strict';

module.exports = (aws, models, utils, name) => {

	var Model = {};

	var _ = require('underscore');

	var fs = require('fs');

	var path = require('path');

	var tableNameKey = `${name.toUpperCase()}_TABLE_NAME`;
	
	var tableName = process.env[tableNameKey];

	var db = 'dynamodb';

	var dirpath = path.resolve(__dirname, db);
	
	_.each(fs.readdirSync(dirpath), function(method) {

		var methodName = path.basename(method, '.js');

		try {
			Model[methodName] = require(`${dirpath}/${method}`)(aws, utils, tableName, name);
		}
		catch (err) {}

	});

	return Model;

};