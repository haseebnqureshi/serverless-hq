'use strict';

/*
Most API Gateway callbacks are pretty standard, especially when
starting out. It's when you're maintaining a project when you'll
need to craft custom responses, and so these helpers get you 
from 0 - 100 faster.
*/

var _ = require('underscore');

module.exports.easyRespond = (result, err, defaultStatusCode, context, message) => {
	var body = Util.responseBody(result, err, defaultStatusCode || null, message || null);
	var response = Util.responseObject(body);
	return context.succeed(response);
};

module.exports.keepDataAsArray = (data) => {

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

};

module.exports.parseEvent = (event, allowEmptyValues) => {

	//first we try and obtain our body (req attributes)
	var body = {};
	try {
		body = JSON.parse(event.body);
	}
	catch (err) {
		body = event.body;
	}
	
	//filtering out empty values, unless otherwise specified
	if (allowEmptyValues === true) {}
	else {
		body = _.omit(body, function(value) {
			return value == '';
		});
	}

	//making sure we have pathParameters
	var parsed = event.pathParameters || {};

	//so we can add body as parameter
	parsed.body = body;

	return parsed;

};

module.exports.responseBody = (data, err, defaultStatusCode, message) => {

	//get our default body
	var body = { 
		status: defaultStatusCode || 200,
		statusCode: defaultStatusCode || 200,
		message: message || '',
		data: Util.keepDataAsArray(data),
		err: null
	};

	//if we have an error, we automatically infer server-side 500
	if (err) {
		body.status = 500;
		body.statusCode = 500;
		body.err = err;
		body.message = err.message;
	}

	//if no error, check if no data, then 404 not-found
	else if (body.data.length === 0) {
		body.status = 404;
		body.statusCode = 404;
	}

	return body;

};

module.exports.responseObject = (responseBody, moreProperties) => {

	//exstend response to include more props like headers
	return _.extend({
		statusCode: responseBody.statusCode,
		body: JSON.stringify(responseBody)
	}, moreProperties);

};
