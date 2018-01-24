'use strict'


module.exports= function(msg){

	var fs = require("fs"),
	morgan = require("morgan"),
	path = require("path"),
	rfs = require("rotating-file-stream");


	var logingPath = path.join(__dirname, "../log/models");

	fs.existsSync(logingPath) || fs.mkdirSync(logingPath);

	var accessLogStream = rfs('sequelise.log', {size:"10M", interval:"1d", compress:"gzip", path: logingPath});

	accessLogStream.write(msg);

}