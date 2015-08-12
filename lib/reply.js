var xml2js = require( 'xml2js' ),
	BufferHelper = require( 'BufferHelper' );


var tmp = {
	text: ['<xml>',
			'<ToUserName><![CDATA[{toUser}]]></ToUserName>',
			'<FromUserName><![CDATA[{fromUser}]]></FromUserName>',
			'<CreateTime>12345678</CreateTime>',
			'<MsgType><![CDATA[text]]></MsgType>',
			'<Content><![CDATA[{content}]]></Content>',
			'</xml>'].join('')
}

function reply( req, res ){

	var bufferData = new BufferHelper();
	req.on( 'data', function( chuck ){
		bufferData.concat( chuck );
	} );
	req.on( 'end', function(){
		var xmlStr = bufferData.toBuffer().toString();
		xml2js.parseString(xmlStr, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
			var ret = result;
			reply[ ret.xml.MsgType ]( req, res, ret.xml, function(res){res.sendStatus(1)}  ); 
		})
	})

}

reply.event = function( req, res, config, cb ){
	console.log( 'event')
	cb(res);	
}

reply.text = function( req, res, config ){
	var data = {
		toUser: config.FromUserName,
		fromUser: config.ToUserName,
		content: '你好'
	}
	var _html = tmp['text'].replace( /\{(.*?)\}/g, function( $1, $2 ){
				return data[ $2 ];
			});
	res.send( _html );

}

module.exports = reply;
