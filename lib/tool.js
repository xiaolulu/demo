var querystring = require('querystring'),
BufferHelper = require('BufferHelper'),
https = require('https'),
http = require('http');

var access_token = '';

function reqConfig(config, callback) {
	
	
	https.get("https://api.weixin.qq.com" + config.path, function(res) {
	  res.on( 'data', function(d){
			d = JSON.parse( d ) 
			console.log( d );
			access_token = d.access_token;
			createMenu();
		})
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
    

}

var menuItem = {
     "button":[
     {	
          "type":"click",
          "name":"=会员=",
          "key":"V102000001"
      },
      {	
          "type":"click",
          "name":"借款还款",
          "key":"V101222222"
      },
		{	
          "type":"click",
          "name":"=发现=",
          "key":"V100333333"
      }]
 }

function createMenu( req, res ){
	var postData = JSON.stringify(menuItem );
	console.log( postData );
	var headers={};
	headers.host = 'iwx.qjdchina.com';
	headers['Content-length']=postData.length;
	var options = {
	  hostname: 'api.weixin.qq.com',
	  port: 443,
	  path: '/cgi-bin/menu/create?access_token=' + access_token,
	  method: 'POST',
	  headers: headers
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

    reqConfig: reqConfig,
	createMenu: createMenu

}
