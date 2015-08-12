var site = require( '../config/site' ),
	user = require( '../lib/user' );
function join( req, res ){
    res.render( 'user/join.ejs', site.setting( req ) );
}

function info( req, res ){
    res.render( 'user/info.ejs', site.setting( req ) );
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

function loginWidthOpenid( req, res, cb ){
	user.loginWidthOpenid( req, res, cb );
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
	bindOpenid: bindOpenid,
	loginWidthOpenid: loginWidthOpenid,
    join: join,
    info: info,
	fetchInfo: fetchInfo,
	fetchSmsCode: fetchSmsCode,
	checkSmsCode: checkSmsCode,
    partner: partner
}
