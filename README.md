
## Serverless HQ
Serverless Framework is fantastic, but it's hard to manage several Serverless services together and get them sharing resources, let alone sharing data models with each other.

Serverless HQ gets us a slightly opinionated abstraction layer for your Node application. Rather than obfuscating Serverless, HQ instead stiches any number of SLS services together. HQ gets you shared libraries, data modeling, and deven utilities that are consistently available across your services.

And we've shoved all of this into an easy-to-manage NPM package. So as SLS improves, we can manage our versions appropriately - without altering your code. (Yay versioning!)

### Getting Started
First, install the package into your project that will contain any number of Serverless services: ```npm install serverless-hq --save```. 

Second, you can start with one of two boilerplates to get going:
1. ```sls-hq new-crud {name}``` This gets you a CRUD service up-and-going. For instance, need basic CRUD operations on Todo items? Simply ```sls-hq new-crud Items``` and HQ will create your ```items``` directory, with a SLS service ready-to-go.
2. ```sls-hq new-html {name}``` This gets you a static website up-and-going. In particular, this out-of-the-box SLS service generates S3 buckets and creates the right policies to enable static website hosting. When you have your files ready to go public, run the command ```sls-hq sync-html {name}```. Right from your command line, you'll have files hosted via S3! 

Between these two commands, you'll have code that quickly gets you a data backend service, and front-end HTML code that any user could potentially see. You could one or both, whatever helps you with your next Serverless project. 
