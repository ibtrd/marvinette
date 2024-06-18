const crypto = require('crypto');

const secret = crypto.randomBytes(128).toString('base64');
console.log(secret);