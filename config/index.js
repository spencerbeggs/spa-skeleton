"use strict";
var _ = require("lodash");

var config = {};
config.app = {
	name: "SPA Skeleton",
	description: "An opinionated front-to-back stack to bootstrap single-page-app projects. Uses Express, MongoDB, Backbone, Browserify, LESS and Gulp.",
	slug: "app"
};
config.env = "unknown";
config.enviornment = "unknown";
config.is = {
	dev: false,
	development: false,
	prod: false,
	production: false
};
config.not = {
	dev: true,
	development: true,
	prod: true,
	production: true
};

_.merge(config, require("./public"));

if (typeof window === "undefined") {
	_.merge(config, require("./secret"));
}

config.hostname = config.subdomain ? config.subdomain + "." + config.domain : "" + config.domain;
var thePort = [80, 443].indexOf(config.port) === -1 ? ":" + config.port : "";
config.url = config.protocol + "://" + config.hostname + thePort;

module.exports = config;
