"use strict";
var pjson = require("../package.json");
var config = require("../config/index.js");
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.use(function(req, res, next) {
	_.merge(res.locals, config);
	next();
});

router.get("/", function(req, res, next) {
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

module.exports = router;
