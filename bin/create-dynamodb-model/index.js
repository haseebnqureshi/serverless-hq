'use strict';

module.exports = (Config, AWS, Utils) => {

	var path = require('path');

	var ModelName = path.basename(__dirname);

	var TableName = Config.SLS_HQ_NAMEDynamoDbTable;

	return {

		Create: require('./DynamoDB/Create.js')(Config, AWS, Utils, TableName),

		Delete: require('./DynamoDB/Delete.js')(Config, AWS, Utils, TableName),

		Read: require('./DynamoDB/Read.js')(Config, AWS, Utils, TableName),

		ReadAll: require('./DynamoDB/ReadAll.js')(Config, AWS, Utils, TableName),

		Update: require('./DynamoDB/Update.js')(Config, AWS, Utils, TableName)

	};

};

