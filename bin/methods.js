'use strict';

var mustache = require('mustache');

var _ = require('underscore');

var fs = require('fs');

var path = require('path');

var exec = require('child_process').execSync;

var sourceDir = __dirname;

var targetDir = process.env.PWD;

var Methods;

Methods = {

	answers: {},
	options: {
		service: '',
		providerName: '',
		providerRuntime: '',
		providerStage: '',
		providerRegion: '',
		providerProfile: '',
		createCrud: false,
		createHtml: false,
		createHtmlRedirect: false,
		crud: [],
		crudEnv: [],
		htmlEnv: [],
	},

	copyLib: () => {
		exec(`cp -r ${sourceDir}/Lib ${targetDir}/Lib`, {
			stdio: []
		});
	},

	createApi: (options) => {
		exec(`cp ${sourceDir}/serverless.yml ${targetDir}/serverless.yml`, {
			stdio: []
		});
		Methods.renderFile(`${targetDir}/serverless.yml`, options);
	},

	createCrud: (Name) => {
		exec(`cp -r ${sourceDir}/Resource ${targetDir}/${Name}`, {
			stdio: []
		});
		exec(`cp -r ${sourceDir}/crud ${targetDir}/Lib/Models/${Name}`, {
			stdio: []
		});
	},

	createHtml: () => {
		exec(`cp -r ${sourceDir}/Html ${targetDir}/Html`, {
			stdio: []
		});
	},

	createModel: (Name) => {
		exec(`cp -r ${sourceDir}/Model ${targetDir}/Lib/Models/${Name}`, {
			stdio: []
		});
	},

	createUtil: (Name) => {
		exec(`cp -r ${sourceDir}/Util ${targetDir}/Lib/Utils/${Name}`, {
			stdio: []
		});
	},

	parseAnswers: (answers) => {
		var that = Methods;
		that.answers = answers;
		that.options.service = answers.service;
		that.options.providerName = answers.providerName;
		that.options.providerRuntime = answers.providerRuntime;
		that.options.providerStage = answers.providerStage;
		that.options.providerRegion = answers.providerRegion;
		that.options.providerProfile = answers.providerProfile;
		that.options.createCrud = answers.createApi;
		that.options.createHtml = answers.createHtml;
		that.options.createHtmlRedirect = answers.htmlForceNonWww;

		that.options.htmlEnv.push({
			KEY: 'HTML_BUCKET_NAME',
			value: answers.htmlBucketName
		});

		_.each(answers.apiResources.split(', '), function(Resource) {
			var resource = Resource.toLowerCase();
			var tableName = `${answers.service}-${resource}`;
			var tableNameKey = `${Resource.toUpperCase()}_TABLE_NAME`;

			that.options.crudEnv.push({
				KEY: tableNameKey,
				value: tableName
			});

			that.options.crud.push({
				Name: Resource,
				name: resource,
				tableName: tableName,
				tableNameKey: tableNameKey,
				functions: [
					{
						Method: 'Create',
						method: 'create',
						name: Resource,
						http: {
							path: `${resource}`,
							method: 'post',
							cors: true
						}
					},
					{
						Method: 'ReadAll',
						method: 'readAll',
						name: Resource,
						http: {
							path: `${resource}`,
							method: 'get',
							cors: true
						}
					},
					{
						Method: 'Read',
						method: 'read',
						name: Resource,
						http: {
							path: `${resource}/{id}`,
							method: 'get',
							cors: true
						}
					},
					{
						Method: 'Update',
						method: 'update',
						name: Resource,
						http: {
							path: `${resource}/{id}`,
							method: 'put',
							cors: true
						}
					},
					{
						Method: 'Delete',
						method: 'delete',
						name: Resource,
						http: {
							path: `${resource}/{id}`,
							method: 'delete',
							cors: true
						}
					}
				]			
			});
		});

	},

	renderFile: (filepath, data) => {
		var template = fs.readFileSync(filepath, 'utf8');
		var rendered = mustache.render(template, data);
		fs.writeFileSync(filepath, rendered, 'utf8');
	},

	run: () => {
		var that = Methods;
		that.copyLib();

		if (that.options.createCrud) {
			that.createApi(that.options);

			_.each(that.options.crud, function(resource) {
				that.createCrud(resource.Name);
			});
		}

		if (that.options.createHtml) {
			that.createHtml();
		}
	}

};

module.exports = Methods;