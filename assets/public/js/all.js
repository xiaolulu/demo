define( function(){
    wx.config({
		debug: true,
		appId: 'wxfb96cc74703eb978',
		timestamp: '',
		nonceStr: '',
		signature: '',
		jsApiList: []
	});

	wx.error( function( res ){
		console.log( res );
	});
})
