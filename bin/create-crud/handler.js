'use strict';

var Shared = require('shared');

module.exports.create = (event, context, callback) => {
	var item = Shared.Utils.API.parseEvent(event);
	Shared.Models.SLS_HQ_NAME.Create(item.body, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.readAll = (event, context, callback) => {
	Shared.Models.SLS_HQ_NAME.ReadAll((err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.read = (event, context, callback) => {
	var item = Shared.Utils.API.parseEvent(event);
	Shared.Models.SLS_HQ_NAME.Read(item.id, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.update = (event, context, callback) => {
	var item = Shared.Utils.API.parseEvent(event);
	Shared.Models.SLS_HQ_NAME.Update(item.id, item.body, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};

module.exports.delete = (event, context, callback) => {
	var item = Shared.Utils.API.parseEvent(event);
	Shared.Models.SLS_HQ_NAME.Delete(item.id, (err, result, message) => {
		return Shared.Utils.API.easyRespond(result, err, 200, context, message);
	});
};
