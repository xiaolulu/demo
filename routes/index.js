
var issue     	= require( './issue' ),
	user 	  	= require( './user' ),
	domain 	  	= require( 'domain' ),
	privilege 	= require( '../config/privilege' ),
	xml2js 	  	= require( 'xml2js' ),
	token 	  	= require( '../lib/token' ),
	redis 		= require( '../tool/redis' );
	toy   		= require( '../tool/toy' ),
	reply 		= require( '../lib/reply' );

var Domain = domain.create();
 
//token.get();

Domain.on( 'error', function( e ){

	console.log( 'error' + e );
	toy.log.error( 'domain' + e );

});

function isBinded( key, cb ){
		
	redis.get( key, function( reply ){
		
		cb( reply );
		toy.log.info( 'isBinded: key=' + key + ';reply=' + reply );

	});
}

function useLogin(req, res, next, ssoCookie, openid) {

	toy.log.info( 'userLogin: openid=' + openid + ';ssoCookie=' + ssoCookie );

    if (ssoCookie) {

        isBinded(ssoCookie, function(ret) {
			
            if (!ret) {

               useLoginOpenid( req, res, openid )

            } else {

				ret = JSON.parse( ret );
				
                if( req.path == '/user/join' && ret.member == true ){

					res.redirect( '/user/info' );

				} else if( req.path != '/user/join' && ret.member == false ){

					res.redirect( '/user/join' );

				} else {

					next();

				}

            }

        });

    } else {

        useLoginOpenid( req, res, openid );

    }
}

function useLoginOpenid( req, res, openid ){

	req.body = {
        'openId': openid
    };

    user.loginWidthOpenid( req, res, function( ret ){
		
        if (ret.code != '0') {

            res.redirect( '/login' );

        } else {

            res.redirect( req.path );

        }
		toy.log.info( 'useLoginOpenid: openid=' + openid + ';ret=' + ret );

    });

}

exports.all = function( app ){

    app.use( function( req, res, next ){	

		//res.send(req.query.echostr);
		//next();
		//return;

		console.log( req.path + ':::::::::' + req.method );
		toy.log.info( 'first: req.path=' + req.path + ';req.method=' + req.method );

		if( req.path == '/' ){

			reply( req, res );
			return;

		}		

		if( !privilege[req.path] ){

			next();	
			return;

		}

		var openid = toy.getCookie( req.headers.cookie, 'userid' ),
			ssoCookie = toy.getCookie( req.headers.cookie, 'sso_cookie' );

		toy.log.info( 'first: openid=' + openid );

		if( !openid || openid == 'undefined' ){

			token.getOpenid( req.query.code, function( data ){

				res.setHeader( 'Set-Cookie', 'userid=' + data.openid + ';path=/;' );

				useLogin( req, res, next, ssoCookie, data.openid );

			} );

		} else {

			useLogin( req, res, next, ssoCookie, openid );

		}
        
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
	app.post( '/bindUser', function( req, res ){

		user.bindOpenid( req, res );

	});
    app.get( '/user/join', function( req, res ){

        user.join( req, res );

    });

	app.post( '/user/apply', function( req, res ){

		user.apply( req, res );

	});

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
