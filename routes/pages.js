"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.get("/", function(req, res, next) {
	res.locals.content = {
		title: "This is the Homepage",
		description: "This is the description"
	};
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

router.get("/two", function(req, res, next) {
	res.locals.content = {
		title: "This Is the Title",
		description: "This is the description"
	};
	res.locals.pageId = "bar";
	res.locals.template = "pages/home";
	next();
});

router.get("/three", function(req, res, next) {
	res.locals.pageId = "three";
	res.locals.template = "pages/two";

	next();
});

module.exports = router;
