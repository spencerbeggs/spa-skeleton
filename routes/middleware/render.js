"use strict";
var config = require("../../config");
var minify = require("html-minifier").minify;

module.exports = function(req, res, next) {
	if (config.env === "dev") {
		if (config.browserSync) {
			res.locals.js.body.push({
				url: "http://" + config.hostname + ":5000/browser-sync/browser-sync-client.2.2.3.js",
				async: true
			});
		}
	}
	if (res.locals.template) {
		res.render(res.locals.template, {
			helpers: {

			}
		}, function(err, html) {
			if (err) {
				console.log(err);
			}
			var output = minify(html, {
				collapseWhitespace: (config.env !== "dev") ? true : false,
				removeComments: (config.env !== "dev") ? true : false,
				minifyJS: (config.env !== "dev") ? true : false
			});
			res.locals = {};
			return res.send(output);
		});
	} else {
		return next();
	}
};
