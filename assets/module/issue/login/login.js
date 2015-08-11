
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		md5: 'core/js/md5'
	}
})

define( ['md5', 'all'], function( md5 ){
	//alert( location.href );
	wx.ready( function(){
		
	});

	$.cookies.set('jxiao','is a good man');
	//alert( $.cookies.get('openid'));
	
    $( '#loginForm' ).on( 'submit', function(){
        var data = {
            phone: $('#username').val(),
            password: $('#password').val()
        }
        $.ajax({
            url: '/login',
            type: 'post',
			dataType: 'json',
			data: data,
            success: function( ret ){
                    if( ret.code == 0){
                      	$.cookies.set( 'username', data.username );
                        window.location.href = '/user/info';
                    } 
            }
        });
        return false;
    })
});
