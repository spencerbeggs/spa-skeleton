"use strict";
var config = global.config = require("config");
console.log(config.app.name + " started");
var $ = require("jquery");

$(document).ready(function() {
	console.log("jQuery document ready");
});
