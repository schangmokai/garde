'user strict';
var fs = require("fs"),
morgan = require("morgan"),
path = require("path"),
rfs = require("rotating-file-stream");

var logingPath = path.join(__dirname, "../tmp/models");
//ensure that the log folder exists
fs.existsSync(logingPath) || fs.mkdirSync(logingPath);
//create a rotating write stream
var sequelizeLogStream = rfs('sequelize.log',{
	size:"10M",
	interval:"1d",
	compress:"gzip",
	path:logingPath
});
module.exports = function(msg){
	try{
		sequelizeLogStream.write("-- "+(new Date()) +" -- "+JSON.stringify(msg)+"\r\n");
	}catch(r){
		sequelizeLogStream.write("-- "+(new Date()) +" -- "+msg+"\r\n");
	}
}