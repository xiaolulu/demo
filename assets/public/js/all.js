define( function(){
    wx.config({
		debug: false,
		appId: 'wxfb96cc74703eb978',
		timestamp: '',
		nonceStr: '',
		signature: '',
		jsApiList: []
	});

	wx.error( function( res ){
		console.log( res );
	});

	function getHrefParam( key ){
		var params = location.search.substr(1).split('&'),
			item,
			i = 0;
		while( item = params[i] ){
			item = item.split( '=' );
			if( item[0] == key ){
				return item[1]
			}
			i++;
		}
		return null;
	}
	function getOpenid(){
		var code = getHrefParam( 'code' );
		//alert( code );
		$('#username').val(code);
		return;
		$.ajax( {
			url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			data: {
					appid: 'wxfb96cc74703eb978',
					secret: 'd49d5f6febd267637d85c56af4370bce',
					code: code,
					'grant_type': 'authorization_code'				
				},
			success: function( ret ){
				alert( ret );
			}
		} );
	}

	getOpenid();

})
