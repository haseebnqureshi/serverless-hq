'use strict';

module.exports = (Config, AWS, Utils) => {

	var DB = 'DynamoDB';

	var path = require('path');

	var fs = require('fs');

	var _ = require('underscore');	

	var ModelName = path.basename(__dirname);

	var TableName = `${Config.appPrefix}-${Config.SLS_HQ_NAMEDynamoDbTableSuffix}`;

	var dirpath = path.resolve(__dirname, DB);

	var Methods = {};

	_.each(fs.readdirSync(dirpath), function(method) {

		var methodName = path.basename(method, '.js');

		try {
			Methods[methodName] = require(`${dirpath}/${method}`)(Config, AWS, Utils, TableName);
		}
		catch (err) {}

	});

	return Methods;

};