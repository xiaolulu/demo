var site = require( '../config/site' );
function join( req, res ){
    res.render( 'user/join.ejs', site.setting( req ) );
}

function info( req, res ){
    res.render( 'user/info.ejs', site.setting( req ) );
}

function partner( req, res ){
    res.render( 'user/partner.ejs', site.setting( req ) );
}


module.exports = {
    join: join,
    info: info,
    partner: partner
}
