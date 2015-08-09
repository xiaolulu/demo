
var issue = require( './issue' ),
	user = require( './user' ),
	domain = require( 'domain' ),
	privilege = require( '../config/privilege' ),
	BufferHelper = require( 'BufferHelper' ),
	xml2js = require( 'xml2js' ),
	token = require( '../lib/token' ),
	gadget = require( '../tool/gadget' );

var Domain = domain.create();

token.get();

function xml2Json( xml ){
	
	return json;
}

Domain.on( 'error', function( e ){
	console.log( 'error' + e );
})

var xmlStr = '<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>1351776360</CreateTime><MsgType><![CDATA[link]]></MsgType><Title><![CDATA[公众平台官网链接]]></Title><Description><![CDATA[公众平台官网链接]]></Description><Url><![CDATA[url]]></Url><MsgId>1234567890123456</MsgId></xml> ';

var path = {
	'text': 'text',
	'event': 'event'
}

var tmp = {
	text: ['<xml>',
			'<ToUserName><![CDATA[{toUser}]]></ToUserName>',
			'<FromUserName><![CDATA[{fromUser}]]></FromUserName>',
			'<CreateTime>12345678</CreateTime>',
			'<MsgType><![CDATA[text]]></MsgType>',
			'<Content><![CDATA[{content}]]></Content>',
			'</xml>'].join('')
}

var replay = {};

replay.event = function( req, res, config, cb ){
	cb();	
}

replay.text = function( req, res, config ){
	var data = {
		toUser: config.FromUserName,
		fromUser: config.ToUserName,
		content: '你好'
	}
	var _html = tmp['text'].replace( /\{(.*?)\}/g, function( $1, $2 ){
				return data[ $2 ];
			});
	console.log( _html );
	res.send( _html );

}

function checkPower(){
	return 0;
}

var needLogin = {
	'/user/join': 1,
	'/user/info': 1,
	'/user/partner': 1
}

exports.all = function( app ){
    app.use( function( req, res, next){	
		console.log( req.path );
		if( req.path != '/' ){
			if( needLogin[ req.path ] && !checkPower() ){
				res.redirect( '/login' );
			} else {
				next();
			}
			return;
		}
		var bufferData = new BufferHelper();
		req.on( 'data', function( chuck ){
			bufferData.concat( chuck );
		} );
		req.on( 'end', function(){
			var xmlStr = bufferData.toBuffer().toString();
			xml2js.parseString(xmlStr, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
				var ret = result;
				replay[ ret.xml.MsgType ]( req, res, ret.xml, function(){ next()} ); 
			})
		})
        
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
    app.get( '/user/join', function( req, res ){
        user.join( req, res );
    });
    app.get( '/user/partner', function( req, res ){
        user.partner( req, res );
    });
    app.get( '/user/info', function( req, res ){
        user.info( req, res );
    });
}
