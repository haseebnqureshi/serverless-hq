Serverless made quick & easy.

![Serverless HQ Logo](http://github-haseebnqureshi.s3.amazonaws.com/serverless-hq.png)

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
![npm monthly downloads](https://img.shields.io/npm/dm/serverless-hq.svg)
![github release](https://img.shields.io/github/release/haseebnqureshi/serverless-hq.svg)
![github license](https://img.shields.io/github/license/haseebnqureshi/serverless-hq.svg)

### This is your home base for quick & powerfully easy scaffolding for your next Serverless project.

### Serverless Framework
First, you'll want to install the Serverless Framework and follow the company's excellent guide here at this link:
https://serverless.com/framework/docs/providers/aws/guide/installation/

### Get Started in Seconds
1. ```npm install serverless-hq -g```;
2. ```sls-hq``` and answer the prompts;
3. ```sls deploy```!

### Background & Why
While Serverless Framework is fantastic, it's hard to craft your new API or front-end experience, right out the bat. Especially in a way that's repeatable, predictable, and fast between projects.

### CRUD Modeling, Static Websites
Rather than obfuscating Serverless, SERVERLESS HQ instead stiches any number of SLS services together. SERVERLESS HQ gets you shared libraries, data modeling, and even utilities that are consistently available across your services.

### API Design Strategy
As outlined from Serverless Framework's founder Austen Collins on Lambda Day 2016, you might want to use a monolithic pattern (maybe with GraphQL), a nano-service pattern (one Lambda function for each tightly focused purpose), or a micro-service pattern (one set of a handful Lambda functions around one resource, like CRUD operations).

### Micro-Services
For SERVERLESS HQ, we prefer micro-services. This npm package gives you super-easy commands to better manage a set of Serverless services, together forming your application.

### NPM Module
We've shoved all of this into an easy-to-manage NPM package. So as SLS improves, we can manage our versions appropriately - without altering your code.

### Contiuing Development
We've really double-downed on Serverless Framework since August. To that, we have more improvements coming (like integrating with Cognito, using Authorizers, incorporating Docker containers for specialized Ubuntu images, etc.)

### Latest Release: 0.3.x API
So much has changed with this release. Now, you can reliably and easily spin up new API's and/or HTML static websites.

No more need for tutorials. We've automated the entire configuration process via command line prompts. In other words, go run ```sls-hq``` and answer some questions. That's it! Modify your code, or not -- and then run ```sls deploy``` to see it all in action.

This release gets you:
- API deployed through API Gateway;
- CRUD enabled resources through DynamoDB tables;
- Static HTML websites easily synced onto any custom defined S3 bucket;
- Much easier and more elegant shared library for use by all parts of your code;
- Conditional config loading for AWS SDK running offline;
- Full use of Lambda's environment variables, making for easy on-the-fly customizations;
- Significantly reduced package sizes;
- Comes standard with serverless-offline;
- Easy-to-use Lambda callback helpers, simplifying your Lambda handlers;
- Clear organization to your project for easier maintainability and readability;
- Out-of-the-box response messages while using CRUD endpoints;
- And significantly faster Serverless development ;)

Now this is all technically still in beta, so if you see any issues or have any ideas for enhancements, please create an issue and I'll review and get back to you.

Until then, happy building!
HQ
