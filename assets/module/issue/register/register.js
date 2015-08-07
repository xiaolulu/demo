require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		md5: 'core/js/md5',
		validate: 'widget/validate/validate'
	}
})

define( ['md5', 'validate', 'all'], function( md5, validate ){

	var username = $( '#username' ),
		password = $( '#password' ),
		email = $( '#email' );

	var usernameRule = [{
			'noBlank': '请输入用户名',
			'min': [ 3, '用户名不能少于3位'],
			'max': [ 16, '用户名长度不能多于16位'],
			'typeEN': '用户名只能为字母及数字' 
		}, function( prompt ){
			$( '#usernameTip' ).html( prompt );
		}],
		passwordRule = [{
			'noBlank': '请输入密码',
			'self': function( cb ){
				cb( '密码不能全为数字' );
				return isNaN( this.value - 0 );
			}
		}, function( prompt ){
			$( '#passwordTip' ).html( prompt );
		}],
		emailRule = [{
			'noBlank': '请输入注册邮箱',
			'typeEmail': '邮箱格式不正确'
		}, function( prompt ){
			$( '#emailTip' ).html( prompt );
		}];

	validate( username, [ 'change' ], usernameRule );
	validate( password, [ 'change' ], passwordRule );
	validate( email, [ 'change' ], emailRule );

    $( '#registerForm' ).on( 'submit', function(){
        var data = {
            username: $('#username').val(),
            password: md5.hex_md5( $('#password').val() ),
            email: $('#email').val()  
        }
        $.ajax({
            url: '/register?a=1',
            type: 'post',
			  dataType: 'json',
			  data: data,
            success: function( ret ){
                if( ret.code == 0 ){
                        alert( '注册成功' )
                    window.location.href="/login";            
                }   
            }
        });
        return false;
    })
});
