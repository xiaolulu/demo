var express = require( 'express' ),
	lib = require( './lib/tool'),
	path = require( 'path' ),
	wechat = require( 'wechat'),
	bodyParser = require( 'body-parser' ),
    http    = require( 'http' );
			
var app = express();
server = http.Server( app );

var confidg = {
	token: 'qjdisgood2015',
	encodingAESKey: '4i6p3mqJgk7nUXIzM3n6qwFkMuEkmt4EgQ0LeZI3jM2',
	appId: 'wx450c87636664d2c4'
}
var config = {
  token: 'qjdisgood2015',
  appid: 'wx450c87636664d2c4',
  encodingAESKey:'4i6p3mqJgk7nUXIzM3n6qwFkMuEkmt4EgQ0LeZI3jM2'
};

app.use(express.query());
/*
app.use( function( req, res, next){
	console.log( req.path);
	next();
});
*/
app.use('/wechat', wechat(config, function (req, res, next) {
	console.log( req );
  var message = req.weixin;
	console.log( message )
	//res.reply('你好');
  if (message.FromUserName === 'diaosi') {
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));
/*
app.use('/corp', wechat( config, wechat.text( function( msg, req, res, next){

	console.log( msg );

})))
*/
/*
app.use( '/corp', wechat(config)
	.text( function( msg, req, res, next ){
		console.log( msg)
	})
	.location( function( msg, req, res, next){
		console.log( msg )
	})
	.event( function( msg, req, res, next){
		console.log( msg )
	})
	.middleware());
*/
app.set( 'port', process.env.PORT || 3001 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/', express.static( path.join( __dirname, 'assets' ))); //静态文件路径
app.use( bodyParser.urlencoded({ extended: false }));
/*
app.use( function( req, res, next ){
        res.send(req.query.echostr);
	//next();
});

app.get( '/index', function( req, res ){
	res.render( 'index.ejs' )
});

app.post( '/createMenu', function( req, res ){
	debugger
	lib.createMenu( req, res );
})
*/
function a(){
	lib.reqConfig({
		    path : '/cgi-bin/token?grant_type=client_credential&appid=wxfb96cc74703eb978&secret=d49d5f6febd267637d85c56af4370bce',
	},  function(data){
		    console.log( data)
	})

}
//a();
//setTimeout( a, 2000 );


server.listen( app.get( 'port'), function(){
        console.log( 'server start ' + app.get( 'port' ) );
});

