
var log4js       = require( 'log4js' ),
	qs           = require( 'querystring'),
	http         = require( 'http' ),
	server       = require( '../config/server' ).server,
	domain       = require('domain'),
	BufferHelper = require( 'BufferHelper' );

var logConfig = {
	"appenders":[
		{"type": "console","category":"console"},
		{
			"type": "dateFile",
			"filename":"./log/",
			"pattern":"yyyyMMdd.log",
			"absolute":true,
			"alwaysIncludePattern":true,
			"category":"logInfo"
		}
	],
	"levels":{"logInfo":"DEBUG"}
}

log4js.configure( logConfig );
var logInfo = log4js.getLogger('logInfo');

var Domain = domain.create();

Domain.on( 'error', function( e ){
	//logInfo.info( '[tool] http async request error =======================' );
	//logInfo.info( e );
});

function getCookie( cookie, name ){
	try{
		var cs = cookie.split(';'),
			c,
			item;
		for( var i = 0; i < cs.length; i++ ){
			c = cs[i];
			item = c.split('=');
			if( item[0].trim() == name ){
			    return item[1];
			}
		}
	} catch( e ){
		return false;
	}
    
};

/******************************* reqConfig ***************************************/
function reqConfig( config, req, res, callback, flag ){
	console.log( 'reqconfig&&&&&&&&&&&&&&&&&&&');
	console.log( req.path + '#####' + req.method );
	req.headers.host = server.hostname;
	
	var method = config.method || 'POST';

	var	path   = config.path + ( ( method.toUpperCase() == 'GET' ) ? '?' + qs.stringify( req.query ) : '' );
	if( method.toUpperCase() == 'POST' ){
		req.headers['content-length'] = qs.stringify(req.body).length;
	}
	var options = {
			host     : server.host,
			port     : server.port,
			path     : path,
			method   : method,
			headers  : req.headers
		},
		bufferData = new BufferHelper(),
		httpreq;

	console.log( options );
	//Domain.run( function(){
	
		httpreq = http.request( options, function( httpres ) {
			var cookies = httpres.headers['set-cookie'];
			console.log( 'java cookie ===================')
			console.log( 'optioins' + options.path )
			console.log( cookies );
			cookies && res.setHeader("Set-Cookie",cookies );
			if( flag ){
				httpres.pipe( res );
				return;
			}
			
			httpres.on( 'data', function ( data ) {
				bufferData.concat( data );
			} );

			httpres.on( 'end', function(){
				console.log( bufferData.toBuffer().toString())
				callback( bufferData );
			});

		} );
	
	//} );
	
	httpreq.on('error', function(e) {

		console.log('problem with request: ' + e.message);
		//logInfo.error( '[tool] request error ======================================= ' );
		//logInfo.error( e.message );
		callback( '{"code": "-1", "msg": "server error"}' );

	});
	console.log( 'reqConfig body******************************' );
	console.log( req.body );
	
	httpreq.write( qs.stringify( req.body ) );
	httpreq.end();

	//logInfo.info( options );

}

module.exports = {

    getCookie: getCookie,
	reqConfig: reqConfig,
	log: logInfo

}
