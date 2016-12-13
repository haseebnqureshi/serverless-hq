'use strict';

module.exports = (Config, AWS, Utils, ModelName) => {

	var TableName = Config.awsDynamoDbTablePrefix + ModelName;

	return {

		/* DEFINE WHAT METHODS YOU WANT INCLUDED IN YOUR MODEL */

		Create: require('./DynamoDB/Create.js')(Config, AWS, Utils, TableName),

		Delete: require('./DynamoDB/Delete.js')(Config, AWS, Utils, TableName),

		Read: require('./DynamoDB/Read.js')(Config, AWS, Utils, TableName),

		ReadAll: require('./DynamoDB/ReadAll.js')(Config, AWS, Utils, TableName),

		Update: require('./DynamoDB/Update.js')(Config, AWS, Utils, TableName)

		/* stop defining here */

	};

};

