'use strict';

module.exports = (aws, utils, tableName, resourceName) => {
	
	/*
	Call whichever data service or methods to persist
	your data. Make sure to call your `callback`:

	Function `callback` requires 3 parameters:

	`error` (required)
		-- Can be either a string, object, or an array.
		-- Must be `null` if there is no error.
		-- Non-null value indicates there was an error 
			persisting data.

	`data` (required)
		-- Must be an array of objects.
		-- This allows us to expect the same data type, 
			regardless of the data call.
		-- Must be an empty array if there was no data 
			to return.

	`message` (required)
		-- Must be a string.
		-- If there's something special we should know
			about the data, we can message here.
		-- If no message, return an empty string.

	*/

	return function(itemId, callback) {

		var dynamoDb = new aws.DynamoDB.DocumentClient();

		dynamoDb.delete({
			TableName: tableName,
			Key: {
				id: itemId
			},
			ReturnValues: 'ALL_OLD'
		}, (error, data) => {

			var data = data || {};
			var results = data.Attributes ? [data.Attributes] : [];
			var message = '';
			if (results.length > 0) {
				message = `Done, just deleted that ${resourceName} item!`;
			}
			else {
				message = `Either that ${resourceName} item didn't exist or was deleted...`;
			}

			return callback(error, results, message);

		});

	};

};