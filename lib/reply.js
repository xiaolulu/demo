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
			'</xml>'].join('');
}

function reply( req, res ){

	var bufferData = new BufferHelper();

	req.on( 'data', function( chuck ){

		bufferData.concat( chuck );

	} );

	req.on( 'end', function(){
		
		var xmlStr = bufferData.toBuffer().toString();
		if( !xmlStr ){
			
			res.sendStatus( 1 );
			toy.info.info( 'replay xml nothing' );
			return;

		}

		xml2js.parseString( xmlStr, { explicitArray : false, ignoreAttrs : true }, function( err, result ){

			var ret = result;
			reply[ ret.xml.MsgType ]( req, res, ret.xml } ); 
			toy.info.info( 'replay: ' + ret );			

		} );

	});

}

reply.event = function( req, res, config ){

	res.sendStatus( 1 );
	
}

reply.text = function( req, res, config ){

	var data = {
			toUser: config.FromUserName,
			fromUser: config.ToUserName,
			content: '你好'
		},
		_html = tmp['text'].replace( /\{(.*?)\}/g, function( $1, $2 ){
				return data[ $2 ];
			});

	res.send( _html );

}

module.exports = reply;
