'use strict';

module.exports = (Config, AWS, Utils) => {

	var Model = {};

	Model.sayHello = (name) => {
		console.log(`Hello, ${name}!`);
	};

	return Model;
};
