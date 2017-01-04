'use strict';

/*
Whenever developing AWS SLS offline, you'll need to specify 
the region, accessKeyId, and secretAccessKey -- at least 
whenever you're accesing other AWS resources that offline
can't spoof. 

This way, SLS can still access your AWS resources live while
you're testing your operative code locally on your machine.

This class gracefully handles that, and pulls your AWS key
values from your local profile appropriately (you know, 
from ~/.aws/credentials).
*/

module.exports = process.env.IS_OFFLINE ? require(`${__dirname}/offline.js`) : require('aws-sdk');
