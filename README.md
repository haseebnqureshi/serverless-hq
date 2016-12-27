
# Serverless HQ
### Serverless made quick & easy. This is your home base for quick & powerfully easy scaffolding for your next Serverless project.

### Background & Why
While Serverless Framework is fantastic, it's hard to manage several Serverless services together. Especially standardizing resources being shared between your Serverless services, so that you're not repeating yourself whenever writing code.

Serverless HQ gets us a slightly opinionated abstraction layer for your Node application. Rather than obfuscating Serverless, HQ instead stiches any number of SLS services together. Serverless HQ gets you shared libraries, data modeling, and even utilities that are consistently available across your services.

And we've shoved all of this into an easy-to-manage NPM package. So as SLS improves, we can manage our versions appropriately - without altering your code. (Yay versioning!)

### Design Strategy
As outlined from Serverless Framework's founder Austen Collins on Lambda Day 2016, you might want to use a monolithic pattern (maybe with GraphQL), a nano-service pattern (one Lambda function for each tightly focused purpose), or a micro-service pattern (one set of a handful Lambda functions around one resource, like CRUD operations).

For SERVERLESS HQ, we prefer micro-services. This npm package gives you super-easy commands to better manage a set of Serverless services, together forming your application.

### Get Started
1. ```npm install serverless-hq --save```
2. ```sls-hq help```
3. Pick your command and go build. (Tutorials coming soon!)

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