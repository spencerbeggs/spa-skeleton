"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.get("/latest", function(req, res, next) {
	res.locals.content = {
		title: "This is the Title",
		description: "This is the description"
	};
	res.locals.pageId = "bar";
	res.locals.template = "pages/latest";
	next();
});

router.get("/foo", function(req, res, next) {
	res.locals.pageId = "baz";
	res.locals.template = "pages/home";

	next();
});




module.exports = router;
