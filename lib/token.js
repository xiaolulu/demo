var querystring  = require('querystring'),
	BufferHelper = require('BufferHelper'),
	config       = require( '../config/server' ),
	https 		 = require('https');

global.access_token = '';

var wechat = config.wechat;

function getToken() {
	
	var cg = {
		'grant_type': 'client_credential',
		appid: config.wechat.appid,
		secret: config.wechat.appsecret
	}
	var path = wechat.host + wechat.pathToken + '?' +  querystring.stringify( cg );
	https.get( path, function(res) {
		res.on( 'data', function( chuck ){

			chuck = JSON.parse( chuck ) 
			global.access_token = d.access_token;
			
			setTimeout( getToken, chuck.expires_in * 1000 );
	
		})
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});

}


function createMenu( req, res ){
	var postData = JSON.stringify( req.body );
	console.log( postData );
	var options = {
	  hostname: 'api.weixin.qq.com',
	  port: 443,
	  path: '/cgi-bin/menu/create?access_token=' + access_token,
	  method: 'POST',
	  headers: req.headers
	};
	console.log( options );
	var req = https.request(options, function(res) {
	  
	  res.on('data', function (d) {
		console.log(JSON.parse( d ));
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(postData);
	req.end();
}

module.exports = {

    get: getToken

}