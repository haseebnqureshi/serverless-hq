
# Serverless HQ
### Serverless made quick & easy. This is your home base for quick & powerfully easy scaffolding for your next Serverless project.

## Please npm install serverless-hq and DO NOT CLONE this repo at Master. We're not following git flow right now (small project) and so it's bleeding edge and very unstable.

### Background & Why
While Serverless Framework is fantastic, it's hard to manage several Serverless services together. Especially standardizing resources being shared between your Serverless services, so that you're not repeating yourself whenever writing code.

Serverless HQ gets us a slightly opinionated abstraction layer for your Node application. Rather than obfuscating Serverless, SERVERLESS HQ instead stiches any number of SLS services together. SERVERLESS HQ gets you shared libraries, data modeling, and even utilities that are consistently available across your services.

And we've shoved all of this into an easy-to-manage NPM package. So as SLS improves, we can manage our versions appropriately - without altering your code. (Yay versioning!)

### Design Strategy
As outlined from Serverless Framework's founder Austen Collins on Lambda Day 2016, you might want to use a monolithic pattern (maybe with GraphQL), a nano-service pattern (one Lambda function for each tightly focused purpose), or a micro-service pattern (one set of a handful Lambda functions around one resource, like CRUD operations).

For SERVERLESS HQ, we prefer micro-services. This npm package gives you super-easy commands to better manage a set of Serverless services, together forming your application.

### Get Started in Seconds
1. ```npm install serverless-hq -g```
2. ```sls-hq``` and follow the command prompts!

### Serverless Framework
First, you'll want to install the Serverless Framework and follow the company's excellent guide here at this link:
https://serverless.com/framework/docs/providers/aws/guide/installation/
