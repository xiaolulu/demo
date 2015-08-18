var toy 	= require( '../tool/toy' ),
	redis 	= require( '../tool/redis' ),
	crypto 	= require( 'crypto' );

var md5 = function(data) { 
	
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase();  

} 


/***********************************************

user

G - fetchUserParters:   获取合作厂家
P - register:           注册
P - login:              登录
G - logout:             退出
G - fetchPartners:      获取合作厂家
P - addPartners:        增加合作厂家
G - fetchSmsCode:       获取手机验证码
P - checkSmsCode:       验证手机验证码
P - resetPwd:           重置密码
P - apply:              申请会员
G - fetchInfo:          获取信息信息

************************************************/

function fetchPartners( req, res ){

	var config = {
			path: '/cif/front/partner/list',
			method: 'get'
		},
		callback = function( ret ){
			
			res.send( JSON.parse( ret ) );

		};

	toy.reqConfig( config, req, res, callback );

}

function addPartners( req, res ){

	var config = {
			path: '/cif/front/partner/add'
		},
		callback = function( ret ){

			res.send( JSON.parse( ret ) );

		};

	toy.reqConfig( config, req, res, callback );

}

function register( req, res ){
	
	var config = {
			path: '/cif/front/user/register',
		},
		callback = function( ret ){

			ret = JSON.parse( ret );
			if( ret.code == 0 ){
				res.setHeader( 'Set-Cookie', 'username=' + req.body.phone + ';path=/;' );
				res.setHeader( 'Set-Cookie', 'corpname=' + req.body.phone + ';path=/;' );
				req.body = {'openId': toy.getCookie( req.headers.cookie, 'openid' )}
				bindOpenid( req, res ); 
			}
			res.send( ret );

		};
	
	toy.reqConfig( config, req, res, callback );

}


function getVerifyCode( req, res ){

	var config = {
			path: '/cif/front/verify/getImgCode',
			method: 'get'
		},
		callback = function( ret ){
			
		};
	
	toy.reqConfig( config, req, res, callback, true );
}

redis.set( 'VerifyLoginTime', '{}');

function checkVerifyCode( req, res ){
	
	var config = {
			path: '/cif/front/verify/checkImgCode'
		},
		callback = function( ret ){
			ret = JSON.parse( ret );
			if( ret.code != '0' ){
				res.send( ret );
			} else {
				login( req, res, true );
			}

		};
	
	toy.reqConfig( config, req, res, callback);
	
}

function redisVerifyLoginTime( method, name, cb ){

	redis.get( 'VerifyLoginTime', function( reply ){
		if( method == 'get' ){
			
		} else if( method == 'set' ){
			if( reply[name] ){
				reply[name] += 1;
			} else {
				reply[name] = 1;
			}
		} else if( method == 'del' ){
			delete reply[name];
		}
		
		redis.set( 'VerifyLoginTime', JSON.stringify( reply ) );
		cb && cb( reply[name] );
	});

}

function login_bak( req, res, flag ){
	if( !flag ){
		redisVerifyLoginTime( 'get', req.body.phone, function( value ){
			if( value > 2 ){
				if( !req.body.verifyCode ){
					res.send( { code: 1021 } );
					return;
				} else {
					checkVerifyCode( req, res );
					return;
				}
			}
			loginConfig( req, res );
		})
		
	} else {
		loginConfig( req, res );
	}
	

}

function loginWidthOpenid( req, res, cb  ){
	var config = {
			path: '/cif/front/user/loginWithOpenId'
		},
		callback = function( ret, result, fields ){
			console.log( 'loginWithOpenId')	;
			console.log( ret );
			ret =  JSON.parse( ret );
			console.log( ret );
			cb( ret );
			
		}
	req.headers['content-type'] = 'application/x-www-form-urlencoded';
	req.headers['accept'] = 'application/json, text/javascript';
	toy.reqConfig( config, req, res, callback );
}
	
function bindOpenid( req, res ){
	var config = {
			path: '/cif/front/user/bind'
		},
		callback = function( ret, resule, fields ){
			console.log( 'bind reset==============')
			console.log( JSON.parse(ret) )
		}
	toy.reqConfig( config, req, res, callback );
	
}

function login( req, res ){
	var config = {
			path: '/cif/front/user/login',
		},
		callback = function( ret, result, fields ){
			ret = JSON.parse( ret );

			if( ret.code == 0 ){
				//redisVerifyLoginTime( 'del', req.body.phone );
				res.send( ret );
				req.body = {'openId': toy.getCookie( req.headers.cookie, 'openid' )}
				bindOpenid( req, res ); 
			} else if( ret.code == '100000020' ){
				redisVerifyLoginTime( 'set', req.body.phone, function( value ){
					if( value > 2 ){
						ret.code = 1022;
					}
					res.send( ret );
				})
			}
		};
	
	toy.reqConfig( config, req, res, callback );
}

function logout( req, res ){
	
	var config = {
			path: '/cif/front/user/logout',
			method: 'get'
		},
		callback = function( ret ){
			
			ret = JSON.parse( ret );
			res.setHeader( 'Set-Cookie', 'sso_cookie=;path=/;' );
			res.redirect( '/' );

		};
	
	toy.reqConfig( config, req, res, callback );
	res.setHeader( 'Set-Cookie', 'sso_cookie=;path=/;' );

}

function fetchSmsCode( req, res ){

	var config = {
			path: '/cif/front/user/fetchSmsCode',
			method: 'get'
		},
		callback = function( ret ){

			res.send( JSON.parse( ret ) );

		};
	
	toy.reqConfig( config, req, res, callback );

}

function checkSmsCode( req, res ){

	var config = {
			path: '/cif/front/user/checkSmsCode',
			type: 'get'
		},
		callback = function( ret ){

			res.send( JSON.parse( ret ) );

		};
	
	toy.reqConfig( config, req, res, callback );

}

function resetPwd( req, res ){

	var config = {
			path:'/cif/front/user/resetPwd',
		},
		callback = function( ret ){

			res.send( JSON.parse( ret ) );

		};
	
	toy.reqConfig( config, req, res, callback );

}

function apply( req, res ){

	var config = {
			path:'/cif/front/member/apply',
		},
		callback = function( ret ){

			res.send( JSON.parse( ret ) );

		};
	
	toy.reqConfig( config, req, res, callback );

}

function fetchInfo( req, res ){

	var config = {
			path:'/cif/front/member/info',
			method: 'get'
		},
		callback = function( ret ){
			
			ret = JSON.parse( ret );
			res.send( ret );
			
		};
	
	toy.reqConfig( config, req, res, callback );

}

module.exports = {
	register:         register,
	login:            login,
	logout:           logout,
	bindOpenid:       bindOpenid,
	loginWidthOpenid: loginWidthOpenid,
	fetchPartners:    fetchPartners,
	addPartners:      addPartners,
	fetchSmsCode:     fetchSmsCode,
	checkSmsCode:     checkSmsCode,
	resetPwd:         resetPwd,
	apply:            apply,
	fetchInfo:        fetchInfo,
	getVerifyCode:    getVerifyCode
}
