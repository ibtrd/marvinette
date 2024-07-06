const path = require('path');

module.exports = function sendIndex(req, res) {
	const file = path.resolve("./build/index.html");
	res.sendFile(file, {}, error => {
		if (error) {
			res.sendFile(path.resolve("./errorPages/maintenance.html"));
		}
	});
}