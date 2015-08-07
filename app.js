
var express    = require( 'express' ),
	lib        = require( './lib/tool'),
	path       = require( 'path' ),
	routes     = require( './routes' ),
	BufferHelper = require( 'BufferHelper' )
	bodyParser = require( 'body-parser' ),
    http       = require( 'http' );
			
var app = express();
server = http.Server( app );

app.set( 'port', process.env.PORT || 3001 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/', express.static( path.join( __dirname, 'assets' ))); //静态文件路径
app.use( bodyParser.urlencoded({ extended: false }));

routes.all( app );


server.listen( app.get( 'port'), function(){
        console.log( 'server start ' + app.get( 'port' ) );
});

