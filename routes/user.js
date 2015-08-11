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

function bindOpenid( req, res ){
	user.bindOpenid( req, res );
}

function loginWidthOpenid( req, res, cb ){
	user.loginWidthOpenid( req, res, cb );
}


module.exports = {
	bindOpenid: bindOpenid,
	loginWidthOpenid: loginWidthOpenid,
    join: join,
    info: info,
    partner: partner
}
