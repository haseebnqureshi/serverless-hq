'use strict';

module.exports = (Config, AWS, Utils, TableName) => {
	
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

		var dynamoDb = new AWS.DynamoDB.DocumentClient();

		dynamoDb.get({
			TableName: TableName,
			Key: {
				id: itemId
			},
			ConsistentRead: false
		}, (error, data) => {

			var message = '';
			var data = data || {};
			var results = data.Item ? [data.Item] : [];
			if (results.length > 0) {
				message = ``;
			}
			else {
				message = `Sorry, didn't find that!`;			
			}
			
			return callback(error, results, message);

		});

	};

};
