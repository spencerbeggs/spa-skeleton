"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");
var pjson = require("../package.json");
var config = require("../config");
var suffix = config.env === "prod" ? ".min" : "";

router.get("/", function(req, res, next) {
	res.locals.content = {
		title: "This is the Homepage",
		description: "This is the description"
	};
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

router.get("/react", function(req, res, next) {
	res.locals.css.head.push({
		url: "/css/react-" + pjson.version + suffix + ".css",
	});
	res.locals.js.body.push({
		url: "/js/react-" + pjson.version + suffix + ".js",
		async: true
	});
	res.locals.pageId = "react";
	res.locals.template = "pages/home";
	next();
});

router.get("/three", function(req, res, next) {
	res.locals.pageId = "three";
	res.locals.template = "pages/two";

	next();
});

var Twitter = require("twitter");
var gps = require("gps2zip");

var client = new Twitter({
  consumer_key: "j8hsKOUEwMUVpMplK6Hlw",
  consumer_secret: "tQNpO12uTdXQpwctFLNi4WOD5nIdS9Q3tuS2uYVAp0",
  access_token_key: "14632447-8e7J23fAgNr8cnfO3owLDW76t14pGHgRubISdi1E",
  access_token_secret: "quY6f6nH43tH6mvMEyUQ4NuhffnOv3Ct5QLVU1BlSY"
});

var tweets = [];

client.stream("statuses/filter", {track: "javascript"}, function(stream) {
  stream.on("data", function(tweet) {
		console.log(tweet);
    tweets.push(tweet);
  });

  stream.on("error", function(error) {
    throw error;
  });
});

router.get("/tweets", function(req, res, next) {
	res.locals.tweets = tweets;
	res.locals.template = "pages/tweets";
	next();
});

module.exports = router;
