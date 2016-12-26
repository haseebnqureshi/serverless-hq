'use strict';

var Shared = require('shared');

module.exports.create = (event, context, callback) => {
	Shared.Models.SLS_HQ_NAME.Create(event, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.readAll = (event, context, callback) => {
	Shared.Models.SLS_HQ_NAME.ReadAll(event, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.read = (event, context, callback) => {
	Shared.Models.SLS_HQ_NAME.Read(event, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.update = (event, context, callback) => {
	Shared.Models.SLS_HQ_NAME.Update(event, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.delete = (event, context, callback) => {
	Shared.Models.SLS_HQ_NAME.Delete(event, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};
