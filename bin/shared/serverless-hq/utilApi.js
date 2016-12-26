'use strict';

/*
Most API Gateway callbacks are pretty standard, especially when
starting out. It's when you're maintaining a project when you'll
need to craft custom responses, and so these helpers get you 
from 0 - 100 faster.
*/

module.exports = (Config) => {

	var _ = require('underscore');

	var Util = {

		easyRespond: (result, err, defaultStatusCode, context, message) => {
			var body = Util.responseBody(result, err, defaultStatusCode || null, message || null);
			var response = Util.responseObject(body);
			return context.succeed(response);
		},

		keepDataAsArray: (data) => {

			//no matter what, returning an array of data
			if (_.isArray(data)) {
				return data;
			}
			else if (_.isObject(data)) {
				return [data];
			}
			else if (data === null || data === undefined) {
				return [{}];
			}
			else {
				return [{}];
			}
		},

		responseBody: (data, err, defaultStatusCode, message) => {

			//get our default body
			var body = { 
				statusCode: defaultStatusCode || 200,
				message: message || '',
				data: Util.keepDataAsArray(data),
				err: null
			};

			//if we have an error, we automatically infer server-side 500
			if (err) {
				body.statusCode = 500;
				body.err = err;
				body.message = err.message;
			}

			//if no error, check if no data, then 404 not-found
			else if (body.data.length === 0) {
				body.statusCode = 404;
			}

			return body;
		},

		responseObject: (responseBody, moreProperties) => {

			//exstend response to include more props like headers
			return _.extend({
				statusCode: responseBody.statusCode,
				body: JSON.stringify(responseBody)
			}, moreProperties);
		}

	};

	return Util;

};
