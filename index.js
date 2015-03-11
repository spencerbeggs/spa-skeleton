"use strict";
var config = require("./config/index.js");

console.log("Starting " + config.app.name + " in " + config.enviornment + " mode...");
// Start the local reverse proxy if we are spoofing a domain in the dev env
if (config.env === "dev" && config.domain !== "localhost" || "127.0.0.1") {
	var process = require("child_process");
	process.fork("proxy.js", function(error, stdout, stderr) {
		if (error) {
			console.log(error.stack);
			console.log("Error code: " + error.code);
			console.log("Signal received: " + error.signal);
		}
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
	});
}

// Bring up Express app
require("./server");
