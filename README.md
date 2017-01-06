
# Serverless HQ
### Serverless made quick & easy. This is your home base for quick & powerfully easy scaffolding for your next Serverless project.

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
