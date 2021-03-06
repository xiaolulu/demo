
var log4js       = require( 'log4js' ),
	qs           = require( 'querystring'),
	http         = require( 'http' ),
	server       = require( '../config/server' ).server,
	domain       = require('domain'),
	toy			 = require( '../tool/toy' ),
	BufferHelper = require( 'BufferHelper' );

var Domain = domain.create();

Domain.on( 'error', function( e ){

	toy.log.error( 'http request: error=' + e );

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
		
		toy.log.error( 'getCookie: error=' + e );
		return false;

	}
    
};

/******************************* reqConfig ***************************************/
function reqConfig( config, req, res, callback ){

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

	
	Domain.run( function(){
	
		httpreq = http.request( options, function( httpres ) {

			res.setHeader("set-cookie", httpres.headers['set-cookie'] );

			httpres.on( 'data', function ( data ) {

				bufferData.concat( data );

			} );

			httpres.on( 'end', function(){

				callback( bufferData );
				toy.log.info( 'http request: ret=' + JSON.parse( bufferData ) );

			});

		} );
	
	} );
	
	httpreq.on('error', function(e) {

		ctoy.log.info( 'http request: error=' + e );

	});
	
	httpreq.write( qs.stringify( req.body ) );

	httpreq.end();

	toy.log.info( 'http request: option=' + options );

}

module.exports = {

    getCookie: getCookie,
	reqConfig: reqConfig

}
