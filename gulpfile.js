/*jshint nonew: false */
"use strict";
var gulp = require("gulp");
var tasks = require("./tasks");
var fs = require("fs");
var config = require("./config");
var pjson = require("./package.json");

var suffix = config.env === "prod" ? ".min" : "";

tasks.nodemon({
	watch: [
		"**/*.js",
		"templates/**/*.hbs"
	],
	ignore: [
		"app/**/*.js",
		"public/**/*.js",
		"tasks/**/*.js",
		"node_modules/**",
		"bower_components/**"
	]
});

gulp.task("beautify-less", function() {
	var settings = JSON.parse(fs.readFileSync("./.jsbeautifyrc", "utf8"));
	tasks.beautify({
		src: ["./less/**/*.less"],
		dest: "./less",
		config: settings.css,
		name: "beautify-less"
	});
});

tasks.jshint({
	src: ["./app/**/*.js"]
});

tasks.browserSync({
	src: ["public/css/**/*.css", "./public/js/**/*.js"]
});

tasks.zone({
	name: "backbone",
	js: "./app/backbone.js",
	css: "./less/backbone.less"
});

tasks.zone({
	name: "react",
	js: "./app/react.js",
	css: "./less/react.less"
});

gulp.task("dev", gulp.series(gulp.parallel(["react", "backbone"]), "nodemon", "browser-sync"));

gulp.task("build", gulp.parallel("react-build", "backbone-build"));

//gulp.task("build", gulp.series(["build-css", "build-js", "react-js-build", "react-css-build"]));
