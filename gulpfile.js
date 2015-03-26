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

tasks.less({
	name: "less",
	src: "./less/desktop.less",
	dest: "public/css/" + config.app.slug + ".css"
});

tasks.watch({
	name: "watch-less",
	src: ["./less/**/*.less"],
	middleware: ["less"]
});

tasks.browserify({
	name: "browserify",
	src: "./app/desktop.js",
	dest: "./public/js/" + config.app.slug + ".js"
});

tasks.watch({
	name: "watch-js",
	src: ["./app/**/*.js"]
});

tasks.buildCss({
	name: "build-css",
	src: "./less/desktop.less",
	dest: "./public/css/" + config.app.slug + suffix + ".css"
});

tasks.buildJs({
	name: "build-js",
	src: "./app/desktop.js",
	dest: "./public/js/" + config.app.slug + suffix + ".js"
});

tasks.browserSync({
	src: ["public/css/**/*.css", "./public/js/**/*.js"]
});

gulp.task("build", gulp.series(["build-css", "build-js"]));

gulp.task("dev", gulp.series(["browserify", "less", "nodemon", gulp.parallel(["watch-js", "watch-less", "browser-sync"])]));
