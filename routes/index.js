
var issue = require( './issue' ),
	user = require( './user' ),
	domain = require( 'domain' ),
	privilege = require( '../config/privilege' ),
	BufferHelper = require( 'BufferHelper' ),
	xml2js = require( 'xml2js' ),
	token = require( '../lib/token' ),
	redis = require( '../tool/redis' );
	tool = require( '../lib/tool' ),
	reply = require( '../lib/reply' ),
	gadget = require( '../tool/gadget' );

var Domain = domain.create();
 
//token.get();


Domain.on( 'error', function( e ){
	console.log( 'error' + e );
});

function isBinded( key, cb ){
		
	redis.get( key, function( reply ){
		
		cb( reply );

	});
}

var needLogin = {
	'/user/join': 1,
	'/user/info': 1,
	'/user/partner': 1
}

function useLogin(req, res, next, ssoCookie, openid) {
	console.log( 'function - userLogin = ' + openid );
    if (needLogin[req.path]) {
        if (ssoCookie) {
            isBinded(ssoCookie, function(ret) {
                if (!ret) {

                   useLoginOpenid( req, res, openid )

                } else {
			ret = JSON.parse( ret );
			res.setHeader( 'Set-Cookie', 'corpname='+ret.corpName+';path=/;');
                    if( req.path == '/user/join' && ret.member == true ){

			
						res.redirect( '/user/info' );
					} else if( req.path != '/user/join' && ret.member == false ){
						res.redirect( '/user/join' );
					} else {
						next();
					}
                }
            })
        } else {
            useLoginOpenid( req, res, openid )
        }
    } else {
        next();
    }
}

function useLoginOpenid( req, res, openid ){
	req.body = {
        'openId': openid
    };
    user.loginWidthOpenid(req, res, function(ret) {
        if (ret.code != '0') {
            res.redirect('/login');
        } else {
            res.redirect(req.path);
        }
    });
}

exports.all = function( app ){
    app.use( function( req, res, next){	
		//res.send(req.query.echostr);
		next();
		return;
		console.log( req.path + ':::::::::' + req.method );
		console.log( req.query)
		if( req.path == '/' ){
			reply( req, res );
			return;
		}
		console.log( console.log( req.headers.cookie ))
		var openid = tool.getCookie( req.headers.cookie, 'openid' ),
			ssoCookie = tool.getCookie( req.headers.cookie, 'sso_cookie');
		console.log( 'openid======' + openid );
		if( !openid || openid == 'undefined' ){
			token.getOpenid( req.query.code, function( data ){
				res.setHeader( 'Set-Cookie', 'openid='+data.openid+';path=/;');
				useLogin( req, res, next, ssoCookie,  data.openid);
			} );
		} else {
			useLogin( req, res, next, ssoCookie, openid );
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
	app.post( '/bindUser', function( req, res ){
		user.bindOpenid( req, res );
	})
    app.get( '/user/join', function( req, res ){
        user.join( req, res );
    });
	app.post( '/user/apply', function( req, res ){
		user.apply( req, res );
	})
    app.get( '/user/partner', function( req, res ){
        user.partner( req, res );
    });
	app.get( '/user/fetchPartners', function( req, res ){
		user.fetchPartners( req, res );
	});
	app.post( '/user/addPartners', function( req, res ){
		user.addPartners( req, res );
	});
    app.get( '/user/info', function( req, res ){
        user.info( req, res );
    });
	app.get( '/user/fetchSmsCode', function( req, res ){
		user.fetchSmsCode( req, res );
	});

	app.get( '/welcome', function( req, res ){
		issue.welcome( req, res );
	});

	app.get( '/user/fetchInfo', function( req, res ){
		user.fetchInfo( req, res );
	});

	app.get( '/wechat/getOpenid', function( req, res ){
		token.getOpenid( req.query.code, function( data ){
			res.send( data );
		} );
	});

	app.get( '/wiki', function( req, res ){
		issue.wiki( req, res );
	});

	app.get( '/intro', function( req, res ){
		issue.intro( req, res );
	});

	app.get( '/art', function( req, res ){
		issue.art( req, res );
	});
	
}
