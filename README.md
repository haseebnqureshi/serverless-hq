
# Serverless HQ
### Serverless made quick & easy. This is your home base for quick & powerfully easy scaffolding for your next Serverless project.

### Background & Why
While Serverless Framework is fantastic, it's hard to manage several Serverless services together. Especially standardizing resources being shared between your Serverless services, so that you're not repeating yourself whenever writing code.

Serverless HQ gets us a slightly opinionated abstraction layer for your Node application. Rather than obfuscating Serverless, SERVERLESS HQ instead stiches any number of SLS services together. SERVERLESS HQ gets you shared libraries, data modeling, and even utilities that are consistently available across your services.

And we've shoved all of this into an easy-to-manage NPM package. So as SLS improves, we can manage our versions appropriately - without altering your code. (Yay versioning!)

### Design Strategy
As outlined from Serverless Framework's founder Austen Collins on Lambda Day 2016, you might want to use a monolithic pattern (maybe with GraphQL), a nano-service pattern (one Lambda function for each tightly focused purpose), or a micro-service pattern (one set of a handful Lambda functions around one resource, like CRUD operations).

For SERVERLESS HQ, we prefer micro-services. This npm package gives you super-easy commands to better manage a set of Serverless services, together forming your application.

### Get Started
1. ```npm install serverless-hq --save```
2. ```sls-hq help```
3. Pick your command and go build. (Tutorials coming soon!)

### Serverless Framework
First, you'll want to install the Serverless Framework and follow the company's excellent guide here at this link:
https://serverless.com/framework/docs/providers/aws/guide/installation/

### AWS Credentials
Second, you'll want to make sure your AWS credentials have been created appropriately. Again, follow the company's excellent guide here at this link:
https://serverless.com/framework/docs/providers/aws/guide/credentials/

### SERVERLESS HQ Tutorial - HTML Website/App
Web applications do really well when you decouple what the users see and experience, from the data that powers that experience. With that infrastructure, it makes a hell of a lot of sense to put your HTML/CSS/JS experience onto Amazon's S3, especially with AWS SSL Manager. (Now, you can deliver HTTPS web experiences via AWS S3 and not pay a fortune via CloudFront!)

So if you're needing to make a HTML website, or to upload your latest Angular / React,Flux / or homegrown Javascript web application, here's how in just a matter of minutes:

1. Once you have the Serverless Framework installed, install SERVERLESS HQ by entering ```npm install serverless-hq``` in your project directory.
2. Then, let's create your HTML resource. Run ```sls-hq create-html app domain.com``` in your project directory (where "domain.com" changes to the actual domain that you want to serve your files). SERVERLESS HQ will now create a ```app``` directory in your project and create the necessary scripts.
3. Go to your newly created ```shared``` library in your project directory. Navigate to ```shared/serverless-app/config.yml```. Go ahead and modify any project variables in that file and save.
4. Now go back up to your project directory. Run ```sls-hq deploy``` and SERVERLESS HQ will create your necessary AWS resources via Serverless Framework.
5. Now go back to your ```app``` directory. You see the ```www``` directory? Move your HTML files and assets into that directory.
6. Here we go. Now run ```sls-hq sync-html``` and viola! Your website and/or app is now online, perfectly scalable on AWS S3.

### SERVERLESS HQ Tutorial - CRUD API
Okay, if we really want to harness the full power of just-in-time servers with Serverless Framework, it'd be great to use DynamoDB as our data modeling. SERVERLESS HQ has your back. 

Right out-of-the-box, you can quickly create basic CRUD operations around any data resource that you're looking to model. We automatically set up your API Gateway and IAM permissions with DynamoDB, so it's literally up and running in minutes. Here's how:

1. Once you have the Serverless Framework installed, install SERVERLESS HQ by entering ```npm install serverless-hq``` in your project directory.
2. Then, let's create your HTML resource. Run ```sls-hq create-crud todos``` in your project directory (where "todos" is the data resource you're looking to model). SERVERLESS HQ will now create a ```todos``` directory in your project and create the necessary scripts.
3. Go to your newly created ```shared``` library in your project directory. Navigate to ```shared/serverless-app/config.yml```. Go ahead and modify any project variables in that file and save.
4. Here we go. Now go back up to your project directory and run ```sls-hq deploy```. SERVERLESS HQ will create your necessary AWS resources via Serverless Framework (DynamoDB tables, the appropriate IAM policies, and everything needed from API Gateway to make a fully functioning CRUD API).

### Tip: sls-hq info
Serverless has an extremely handy command ```sls info```, which displays necessary information about your Serverless service with that short command. SERVERLESS HQ makes it incredibly easy to ```info``` your entire project. Simply go to your project directory and use ```sls-hq info```. SERVERLESS HQ will output information on all your project's Serverless services at once!

### Note: SERVERLESS HQ awsProfile
By default, SERVERLESS HQ uses your ```default``` AWS credentials. If you have multiple accounts, or have set up a different IAM user for all your Serverless functions (recommended), you can select your ```awsProfile``` in the ```shared``` directory when you create your resources with SERVERLESS HQ.

## 0.1.6 Beta 

Oh man, so many stability updates in this release. Fixed a lot of things that were happening in Lambda's runtime environment. 

## 0.1.1 Beta

- Updated our README for better clarity (Tutorials coming soon!)

## 0.1.0 Beta (First Release)

Finally, it's here! Ready and tested, go ahead and use this in production. With a few commands and with the Serverless Framework, you can:

- Serve web applications via S3 and static website hosting;
- Create out-of-the-box ready-to-go DynamoDB CRUD modeling and HTTP events (through API Gateway);
- Have a solid workflow around data modeling and utility helpers, by use of our shared library that's fully accessible by every Lambda functions, in an efficient and lightweight manner;
- Use serverless-offline and run multiple Serverless services at once;
- Automatically load your local AWS credentials into the aws-sdk during offline development (so calling DynamoDB locally won't throw errors, and you don't have to write your own conditional boilerplate around passing AWS options);
- Easy-to-use and clear CLI reference, right there where you need it;
- Semver versioning;
- Clear error outputting, including piping Serverless logging directly through our commands and to your command line;
- Data modeling that easily allows you to create different database adapters on a nano-service level;
- Consolidating critical application variables into one config.yml, with local overrides from service to service (and get full access to these variables in your handlers!).

There's probably more, but these are definitely the highlights. Now go build something great!
HQ
