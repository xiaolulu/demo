
var express    = require( 'express' ),
	toy        = require( './tool/toy'),
	path       = require( 'path' ),
	routes     = require( './routes' ),
	bodyParser = require( 'body-parser' ),
    http       = require( 'http' );
			
var app = express();
server = http.Server( app );

app.set( 'port', process.env.PORT || 3001 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/', express.static( path.join( __dirname, 'assets' ))); 
app.use( bodyParser.urlencoded({ extended: false }));

routes.all( app );

server.listen( app.get( 'port'), function(){
	toy.log.info( 'server start ' + app.get( 'port' ) );
	toy.log.error( 'server start ' + app.get( 'port' ) );
	console.log( 'server start ' + app.get( 'port' ) );
});

