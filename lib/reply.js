var xml2js 		 = require( 'xml2js' ),
	toy			 = require( '../tool/toy' ),
	BufferHelper = require( 'BufferHelper' );

var tmp = {
	text: ['<xml>',
			'<ToUserName><![CDATA[{toUser}]]></ToUserName>',
			'<FromUserName><![CDATA[{fromUser}]]></FromUserName>',
			'<CreateTime>12345678</CreateTime>',
			'<MsgType><![CDATA[text]]></MsgType>',
			'<Content><![CDATA[{content}]]></Content>',
			'</xml>'].join(''),
	subscribe: ['<xml>',
			'<ToUserName><![CDATA[{toUser}]]></ToUserName>',
			'<FromUserName><![CDATA[{fromUser}]]></FromUserName>',
			'<CreateTime>12345678</CreateTime>',
			'<MsgType><![CDATA[news]]></MsgType>',
			'<ArticleCount>1</ArticleCount>',
			'<Articles>',
			'<item>',
			'<Title><![CDATA[立即开启供应链金融服务]]></Title>',
			'<Description><![CDATA[立即开启供应链金融服务]]></Description>',
			'<PicUrl><![CDATA[http://iwx.qjdchina.com/public/imgs/welcome.jpg]]></PicUrl>',
			'<Url><![CDATA[https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfb96cc74703eb978&redirect_uri=http%3A%2F%2Fiwx.qjdchina.com%2Fuser%2Fjoin&response_type=code&scope=snsapi_base&state=123#wechat_redirect]]></Url>',
			'</item>',
			'</Articles>',
		'</xml>'].join('')
};

function reply( req, res ){

	var bufferData = new BufferHelper();

	req.on( 'data', function( chuck ){

		bufferData.concat( chuck );

	} );

	req.on( 'end', function(){

		var xmlStr = bufferData.toBuffer().toString();
		if( !xmlStr ){
			
			res.sendStatus( 200 );
			toy.log.info( 'replay xml nothing' );
			return;

		}

		xml2js.parseString( xmlStr, { explicitArray : false, ignoreAttrs : true }, function( err, result ){

			var ret = result;
			console.log( ret );
			reply[ ret.xml.MsgType ]( req, res, ret.xml ); 
			toy.log.info( 'reply: ' + JSON.stringify( ret ) );			

		} );

	});

}

reply.event = function( req, res, config ){

	if( config.Event == 'subscribe' ){
		var data = {
                        	toUser: config.FromUserName,
                        	fromUser: config.ToUserName,
                	        content: '我们的客服系统正在开发，您可以直接联系我们的客服电话：400-826-1582'
        	        },
                	_html = tmp['subscribe'].replace( /\{(.*?)\}/g, function( $1, $2 ){
                                return data[ $2 ];
                        });
		console.log( _html );
        	res.send( _html );
		return;

	}
	res.sendStatus( 200 );
	
}

reply.text = function( req, res, config ){

	var data = {
			toUser: config.FromUserName,
			fromUser: config.ToUserName,
			content: '我们的客服系统正在开发，您可以直接联系我们的客服电话：400-826-1582'
		},
		_html = tmp['text'].replace( /\{(.*?)\}/g, function( $1, $2 ){
				return data[ $2 ];
			});

	res.send( _html );

}

module.exports = reply;
