
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		doc: 'public/js/zhdoc',
		validate: 'public/js/validate'
	}
})

define( ['doc', 'validate', 'all'], function( DOC, validate ){
	
	var phone = $('#username'),
		password = $( '#password' );

	var PhoneRule = [
			{ 
				'noBlank': '请输入手机号码', 
				'typePhone': '手机格式不正确'
			}, function( prompt ){
				if( prompt ){
					alert( prompt );
				}
			}	
		],
		PasswordRule = [
			{ 
				'noBlank': '请输入注册密码',
				'min': [6, '密码不能少于6位'], 
				'max': [16, '密码不能多于16位']
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 	
		];

	validate( phone, [ 'change' ], PhoneRule );

	validate( password, [ 'change' ], PasswordRule );

	function validateAll(){
		
		return validate( phone, PhoneRule ) 		
		&& validate( password, PasswordRule);

	}
	
    $( '#loginForm' ).on( 'submit', function(){

		if( validateAll() !== true ){
			return false;
		};
	

        var data = {
            phone: phone.val(),
            password: password.val()
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
                    } else {
						alert( DOC.errorCode[ ret.code ] );
					}
            }
        });
        return false;
    })
});
