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
		code = $( '#code' ),
		codeBtn = $( '#smsCodeBtn' );

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
		codeRule = [{
			'noBlank': '请输入注册邮箱',
			'typeEmail': '邮箱格式不正确'
		}, function( prompt ){
			$( '#codeTip' ).html( prompt );
		}];
	/*
	validate( username, [ 'change' ], usernameRule );
	validate( password, [ 'change' ], passwordRule );
	validate( code, [ 'change' ], codeRule );
	*/

    $( '#registerForm' ).on( 'submit', function(){
        var data = {
            phone: username.val(),
            password: md5.hex_md5( password.val() ),
            smsCode: code.val()  
        }
        $.ajax({
            url: '/register',
            type: 'post',
			dataType: 'json',
			data: data,
            success: function( ret ){
                if( ret.code == 0 ){
                    alert( '注册成功' )
                    window.location.href="/user/join";            
                }   
            }
        });
        return false;
    });

	codeBtn.on( 'click', function(){
		fetchsmsCode();
	});

	function fetchsmsCode(){
		
		/*
		if( validate( r_phone, RPhoneRule ) !== true ){
			return false;
		}
		*/
		var data = {
				phone: username.val(),
				source: 'register'
			};
		
		$.ajax({
			url: '/user/fetchSmsCode',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					//countdown()
					return;
				}
				//dialog.show( DOC.errorCode[ ret.code ] || '未知错误[' + ret.code + ']' );
			}
		});

	}
});
