const path = require('path');

module.exports = function sendIndex(req, res){
	res.sendFile(path.resolve("../client/build/index.html"));
}