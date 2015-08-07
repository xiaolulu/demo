debugger
var issue = require( './issue' ),
	user = require( './user' ),
	domain = require( 'domain' ),
	privilege = require( '../config/privilege' ),
	BufferHelper = require( 'BufferHelper' ),
	xml2js = require( 'xml2js' ),
	token = require( '../lib/token' ),
	gadget = require( '../tool/gadget' );

var Domain = domain.create();

//token.get();

function xml2Json( xml ){
	
	return json;
}

Domain.on( 'error', function( e ){
	console.log( 'error' + e );
})

var xmlStr = '<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>1351776360</CreateTime><MsgType><![CDATA[link]]></MsgType><Title><![CDATA[公众平台官网链接]]></Title><Description><![CDATA[公众平台官网链接]]></Description><Url><![CDATA[url]]></Url><MsgId>1234567890123456</MsgId></xml> ';

exports.all = function( app ){
    app.use( function( req, res, next){	
		var bufferData = new BufferHelper();
		gadget.logInfo.info( req.path );
		console.log( req.path );
		req.on( 'data', function( chuck ){
			bufferData.concat( chuck );
		} );
		req.on( 'end', function(){
			//var xmlStr = bufferData.toBuffer().toString();
			xml2js.parseString(xmlStr, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
				console.log(JSON.stringify(result));
			})
		})
		next();
        
    })
    app.get( '/', function( req, res ){
		issue.index( req, res );
    });
    app.get( '/login', function( req, res ){		
        issue.login( req, res );
    });
    app.post( '/login', function( req, res ){
        issue.loginUser( req, res );
    });
    
    app.get( '/register', function( req, res ){  
        issue.register( req, res );
    });
    app.post('/register', function( req, res ){
        issue.registerUser( req, res );
    });
    app.get( '/user/apply', function( req, res ){
        user.center( req, res );
    });
    app.get( '/user/partner', function( req, res ){
        user.blog( req, res );
    });
    app.get( '/user/info', function( req, res ){
        user.info( req, res );
    });
}
