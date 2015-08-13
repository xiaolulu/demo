require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		validate: 'widget/validate/validate',
		doc: 'public/js/zhdoc'
	}
})

define( ['validate', 'doc', 'all'], function( validate, DOC ){

	var phone = $( '#username' ),
		password = $( '#password' ),
		code = $( '#code' ),
		registerBtn = $( '#registerBtn' ),
		codeBtn = $( '#smsCodeBtn' );

	var phoneRule = [
			{ 
				'noBlank': '请输入手机号码', 
				'typePhone': '手机格式不正确'
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			}	
		],
		smsCodeRule = [
			{ 
				'noBlank': '请输入手机验证码', 
				'typeNum': '请输入数字', 
				'min': [6, '不能少于6位'], 
				'max': [6, '不能多于6位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		passwordRule = [
			{ 
				'noBlank': '请输入密码',
				'min': [6, '密码不能少于6位'], 
				'max': [16, '密码不能多于16位']
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 	
		];
	
	validate( phone, [ 'change' ], phoneRule );
	validate( password, [ 'change' ], passwordRule );
	validate( code, [ 'change' ], smsCodeRule );

	function validateAll(){
		
		return validate( phone, phoneRule ) 		
		&& validate( code, smsCodeRule )
		&& validate( password, passwordRule);

	}

    $( '#registerForm' ).on( 'submit', function(){

		if( validateAll() !== true ){
			return false;
		};

        var data = {
            phone: phone.val(),
            password: password.val(),
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
                    window.location.href="/user/join#register";            
                } else {
			alert( DOC.errorCode[ ret.code ]);
		}   
            }
        });
        return false;
    });

	codeBtn.on( 'click', function(){
		fetchsmsCode();
	});

	function fetchsmsCode(){
		
		if( codeBtn.attr( 'disabled' ) == 'disabled' ){
			return;
		}

		if( validate( phone, phoneRule ) !== true ){
			return false;
		}
		var data = {
				phone: phone.val(),
				source: 'register'
			};
		
		$.ajax({
			url: '/user/fetchSmsCode',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					countdown()
					return;
				} else {
					alert( DOC.errorCode[ ret.code ]);
				}
				//dialog.show( DOC.errorCode[ ret.code ] || '未知错误[' + ret.code + ']' );
			}
		});

	}

	var n = 60;
	function countdown(){
		
		if( n-- ){
			codeBtn.html( n + '秒后重新获取' ).attr( 'disabled', true );
			setTimeout( countdown, 1000 )
		} else {
			n = 60;
			codeBtn.html( '点击获取验证码' ).attr( 'disabled', false );
		}

	}

	var _pwdView = true;

	$( '.pwdView' ).on( 'click', function(){
		if( _pwdView ){
			this.innerHTML = 'A';
			password.attr( 'type', 'text');
		} else {
			this.innerHTML = '*';
			password.attr( 'type', 'password' );
		}
		_pwdView = !_pwdView;
	});

	$( '#agree' ).on( 'change', function(){
		registerBtn.attr( 'disabled', !this.checked );
		if( !this.checked ){
			registerBtn.addClass( 'regBtnDisabled')
		} else {
			registerBtn.removeClass( 'regBtnDisabled')
		}
	})
});
