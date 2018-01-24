var qrCode = require('qrcode');

var toSJIS = require('qrcode/helper/to-sjis')


qrCode.toDataURL("mon text", {toSJISFunc:toSJIS}, function(err, url){
	var base64Data = url.replace(/^data:image\/png;base64,/,"");
	require("fs").writeFile("C:/wamp/www/Garde/Qrcode/out.png", base64Data, 'base64', function(err){
       console.log(err);
	});
})