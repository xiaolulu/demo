
var site = require( '../config/site' ),
    user = require( '../lib/user' );

function index( req, res ){
    res.render( 'issue/index.ejs', site.setting( req, '/issue/index', '/index' ) );
}

function register( req, res ){
    res.render( 'issue/register.ejs', site.setting( req, '/issue' ) );
}

function welcome( req, res ){
    res.render( 'issue/welcome.ejs', site.setting( req, '/issue' ) );
}

function registerUser( req, res ){
    user.register( req, res );
}

function login( req, res ){
    res.render( 'issue/login.ejs', site.setting( req, '/issue' ) );
}

function loginUser( req, res ){
    user.login( req, res );
}

function wiki( req, res ){
    res.render( 'issue/wiki.ejs', site.setting( req, '/issue' ) );
}

function intro( req, res ){
    res.render( 'issue/intro.ejs', site.setting( req, '/issue' ) );
}

function art( req, res ){
    res.render( 'issue/art.ejs', site.setting( req, '/issue' ) );
}

module.exports = {
    register: register,
    index: index,
	welcome: welcome,
    registerUser: registerUser,
    login: login,
	art: art,
	wiki: wiki,
	intro: intro,
    loginUser: loginUser
}
