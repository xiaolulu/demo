define( function(){
    wx.config({
		debug: false,
		appId: 'wxfb96cc74703eb978',
		timestamp: '',
		nonceStr: '',
		signature: '',
		jsApiList: []
	});

	window.companyName = $.cookies.get( 'corpname' );

	wx.error( function( res ){
		console.log( res );
	});
	//alert( $.cookies.get( 'openid' ));

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
		alert( code );
		$.ajax( {
			url: '/wechat/getOpenid',
			type: 'get',
			dataType: 'json',
			data: {
					code: code		
				},
			success: function( ret ){
				alert( ret.openid );
			}
		} );
	}

	//getOpenid();

})
