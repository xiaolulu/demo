var site = require( '../config/site' ),
	user = require( '../lib/user' );

function join( req, res ){

    res.render( 'user/join.ejs', site.setting( req ) );

}

function info( req, res ){

    res.render( 'user/info.ejs', site.setting( req ) );

}

function apply( req, res ){

	user.apply( req, res );

}

function partner( req, res ){

    res.render( 'user/partner.ejs', site.setting( req ) );

}

function fetchPartners( req, res ){

	user.fetchPartners( req, res );

}

function addPartners( req, res ){

	user.addPartners( req, res );

}

function bindOpenid( req, res ){

	user.bindOpenid( req, res );

}

function loginWithOpenid( req, res, cb ){

	user.loginWithOpenid( req, res, cb );

}

function fetchInfo( req, res ){

	user.fetchInfo( req, res );

}

function fetchSmsCode( req, res ){

	user.fetchSmsCode( req, res );

}

function checkSmsCode( req, res ){

	user.checkSmsCode( req, res );

}


module.exports = {
	bindOpenid: 		bindOpenid,
	loginWithOpenid: 	loginWithOpenid,
    join: 				join,
    info: 				info,
	apply: 				apply,
	fetchInfo: 			fetchInfo,
	fetchSmsCode: 		fetchSmsCode,
	checkSmsCode: 		checkSmsCode,
	fetchPartners: 		fetchPartners,
	addPartners: 		addPartners,
    partner: 			partner
}
