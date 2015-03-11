"use strict";

var config = {};
config.env = "dev";
config.enviornment = "development";
config.protocol = "http";
config.domain = "127.0.0.1";
config.port = 3000;
config.browserSync = true;
config.is = {
	dev: true,
	development: true
};
config.not = {
	dev: false,
	development: false
};
module.exports = config;
