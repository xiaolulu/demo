
var issue = require( './issue' ),
	user = require( './user' ),
	domain = require( 'domain' ),
	privilege = require( '../config/privilege' ),
	BufferHelper = require( 'BufferHelper' ),
	xml2js = require( 'xml2js' ),
	token = require( '../lib/token' ),
	tool = require( '../lib/tool' ),
	gadget = require( '../tool/gadget' );

var Domain = domain.create();

//token.get();

function xml2Json( xml ){
	
	return json;
}

Domain.on( 'error', function( e ){
	console.log( 'error' + e );
})

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
	res.send( _html );

}

function checkPower(req){
	console.log( 'checkPower');
	var _login = tool.getCookie( req.headers.cookie, 'hasLogin' );
	console.log( _login );
	return _login;
}


var needLogin = {
	'/user/join': 1,
	'/user/info': 1,
	'/user/partner': 1
}

exports.all = function( app ){
    app.use( function( req, res, next){	
		console.log( 'app.user ==========================' );
		console.log( req.path + ':::::::::' + req.method );
		console.log( req.query );
		console.log( '***********************************' );
		if( req.path == '/' ){
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
			return;
		}
		var openid = tool.getCookie( req.headers.cookie, 'openid' );
		console.log( 'openid === ' + openid );
		if( !openid || openid == 'undefined' ){
			token.getOpenid( req.query.code, function( data ){
				res.setHeader( 'Set-Cookie', 'openid='+data.openid+';path=/;');
					if( needLogin[ req.path ] && !checkPower(req) ){
						console.log( 'toLogin' );
						res.redirect( '/login' );
					} else {
						next();
					}
			} );
		}		
		 if( needLogin[ req.path ] && !checkPower(req) ){
                       console.log( 'toLogin' );
                       res.redirect( '/login' );
                 } else {
	                  next();
                  }

        
    })
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

	app.get( '/wechat/getOpenid', function( req, res ){
		token.getOpenid( req.query.code, function( data ){
			res.send( data );
		} );
	})
}
