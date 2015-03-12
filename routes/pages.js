"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.get("/", function(req, res, next) {
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

module.exports = router;
