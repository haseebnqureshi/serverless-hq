'use strict';

module.exports = (aws, models, utils, name) => {

	var Model = {};

	Model.sayHello = (name) => {
		console.log(`Hello, ${name}!`);
	};

	return Model;
};