"use strict";
var config = require("config");
var pjson = require("../../package.json");

module.exports = function(req, res, next) {
	res.locals = config;
	res.locals.css = {
		head: [],
		body: []
	};
	res.locals.js = {
		head: [],
		body: []
	};
	var suffix = config.env === "dev" ? "" : ".min";
	res.locals.css.head.push({
		url: config.url + "/css/" + config.app.slug + "-" + pjson.version + suffix + ".css"
	});
	res.locals.js.head.push({
		url: config.url + "/js/" + config.app.slug + "-" + pjson.version + suffix + ".js"
	});
	next();
};
