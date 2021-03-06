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
		projectEnv: []
	},

	copyLib: () => {
		exec(`cp -r ${sourceDir}/lib ${targetDir}/lib`, {
			stdio: []
		});
		exec(`cd ${targetDir}/lib && npm install`, {
			stdio: []
		});
	},

	createApi: (options) => {
		exec(`cp ${sourceDir}/serverless.yml ${targetDir}/serverless.yml`, {
			stdio: []
		});
		exec(`[ -f ${targetDir}/package.json ] && echo "package.json found" || cp ${sourceDir}/package.json ${targetDir}/package.json`, {
			stdio: []
		});
		exec(`cd ${targetDir} && npm install serverless-offline --save-dev`, {
			stdio: []
		});
		Methods.renderFile(`${targetDir}/serverless.yml`, options);
	},

	createCrud: (name) => {
		exec(`cp -r ${sourceDir}/resource ${targetDir}/${name}`, {
			stdio: []
		});
		exec(`cd ${targetDir}/${name} && npm install`, {
			stdio: []
		});
		exec(`cp -r ${sourceDir}/crud ${targetDir}/lib/models/${name}`, {
			stdio: []
		});
		exec(`cd ${targetDir}/lib/models/${name} && npm install`, {
			stdio: []
		});
		Methods.renderFile(`${targetDir}/${name}/resource.js`, { name });
	},

	createHtml: () => {
		exec(`cp -r ${sourceDir}/html ${targetDir}/html`, {
			stdio: []
		});
		exec(`cd ${targetDir}/html && npm install`, {
			stdio: []
		});
	},

	createModel: (name) => {
		exec(`cp -r ${sourceDir}/model ${targetDir}/lib/models/${name}`, {
			stdio: []
		});
		exec(`cd ${targetDir}/lib/models/${name} && npm install`, {
			stdio: []
		});
	},

	createUtil: (name) => {
		exec(`cp -r ${sourceDir}/util ${targetDir}/lib/utils/${name}`, {
			stdio: []
		});
		exec(`cd ${targetDir}/lib/utils/${name} && npm install`, {
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

		that.options.projectEnv = [
			{ KEY: 'SERVICE', value: that.options.service },
			{ KEY: 'PROVIDER_NAME', value: that.options.providerName },
			{ KEY: 'PROVIDER_RUNTIME', value: that.options.providerRuntime },
			{ KEY: 'PROVIDER_STAGE', value: that.options.providerStage },
			{ KEY: 'PROVIDER_REGION', value: that.options.providerRegion },
			{ KEY: 'PROVIDER_PROFILE', value: that.options.providerProfile }
		];

		if (that.options.createHtml) {
			that.options.htmlEnv.push({
				KEY: 'HTML_BUCKET_NAME',
				value: answers.htmlBucketName
			});		
		}

		var apiResources;
		try {
			apiResources = answers.apiResources.split(', ');
		}
		catch(err) {
			apiResources = [];
		}

		_.each(apiResources, function(Resource) {
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
						Name: Resource,
						name: resource,
						http: {
							path: `${resource}`,
							method: 'post',
							cors: true
						}
					},
					{
						Method: 'ReadAll',
						method: 'readAll',
						Name: Resource,
						name: resource,
						http: {
							path: `${resource}`,
							method: 'get',
							cors: true
						}
					},
					{
						Method: 'Read',
						method: 'read',
						Name: Resource,
						name: resource,
						http: {
							path: `${resource}/{id}`,
							method: 'get',
							cors: true
						}
					},
					{
						Method: 'Update',
						method: 'update',
						Name: Resource,
						name: resource,
						http: {
							path: `${resource}/{id}`,
							method: 'put',
							cors: true
						}
					},
					{
						Method: 'Delete',
						method: 'delete',
						Name: Resource,
						name: resource,
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
				that.createCrud(resource.name);
			});
		}

		if (that.options.createHtml) {
			that.createHtml();
		}
	}

};

module.exports = Methods;