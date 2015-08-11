
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
	}
})
define(['all'], function(){
   var corpName     = $( '#corpName' ),
		registerYear = $( '#registerYear' ),
		size         = $( '#size' ),
		province     = $( '#province' ),
		city         = $( '#city' ),
		strict       = $( '#strict' ),
		address      = $( '#address' ),
		businessId   = $( '#businessId' ),
		legalPerson  = $( '#legalPerson' ),
		idCard       = $( '#idCard' ),
		contact      = $( '#contact' ),
		mobile       = $( '#mobile' ),
		model		 = $( '#model' ),
		partner      = $( '#model' ),
		email        = $( '#email' );
	
	/******************************************
	创建验证规则
	********************************************/
	var corpNameRule = [
			{ 
				'noBlank': '请输入公司名称',
				'typeZEI' : '只允许输入中英文',
				'min'    : [8, '不能少于8位'], 
				'max'    : [25, '不能多于25位'] 
			}, function( prompt){
				$( '.join_prompt_corpName' ).html( prompt );
			}	
		],
		addressRule = [
			{ 
				'noBlank': '请输入公司地址',
				'min'    : [1, '不能少于1位'], 
				'max'    : [30, '不能多于30位'] 
			}, function( prompt){
				$( '.join_prompt_address' ).html( prompt );
			}	
		],
		businessIdRule = [
			{ 
				'noBlank': '请输入工商注册号', 
				'typeNum': '请输入数字', 
				'min'    : [13, '不能少于13位'], 
				'max'    : [15, '不能多于15位'] 
			}, function( prompt){
				$( '.join_prompt_businessId' ).html( prompt );
			} 
		],
		partnerRule = [
			{ 
				'noBlank': '请输入合作厂家名称', 
				'typeZEI' : '只允许输入中英文',
				'min'    : [8, '不能少于8位'], 
				'max'    : [25, '不能多于25位'] 
			}, function( prompt){
				$( '.join_prompt_partner' ).html( prompt );
			} 
		],
		legalPersonRule = [
			{ 
				'noBlank': '请输入法定代表人', 
				'typeZh' : '请输入中文', 
				'min'    : [2, '不能少于2位'], 
				'max'    : [5, '不能多于5位'] 
			}, function( prompt){
				$( '.join_prompt_legalPerson' ).html( prompt );
			} 
		],
		idCardRule = [
			{ 
				'noBlank'   : '请输入身份证号', 
				'typeIdCard': '身份证号无效'
			}, function( prompt){
				$( '.join_prompt_idCard' ).html( prompt );
			} 
		],
		contactRule = [
			{ 
				'noBlank': '请输入常用联系人', 
				'typeZh' : '请输入中文', 
				'min'    : [2, '不能少于2位'], 
				'max'    : [5, '不能多于5位'] 
			}, function( prompt){
				$( '.join_prompt_contact' ).html( prompt );
			} 
		],
		mobileRule = [
			{ 
				'noBlank': '请输入手机号码', 
				'typePhone': '手机格式不正确', 
				'min'    : [11, '不能少于11位'], 
				'max'    : [11, '不能多于11位'] 
			}, function( prompt){
				$( '.join_prompt_mobile' ).html( prompt );
			} 
		],
		emailRule = [
			{ 
				'noBlank'  : '请输入邮箱', 
				'typeEmail': '邮箱格式不正确'
			}, function( prompt){
				$( '.join_prompt_email' ).html( prompt );
			} 
		];
	/*
	validate( corpName,    [ 'change' ], corpNameRule );

	validate( address,     [ 'change' ], addressRule );

	validate( businessId,  [ 'change' ], businessIdRule );

	validate( legalPerson, [ 'change' ], legalPersonRule );

	validate( idCard,      [ 'change' ], idCardRule );

	validate( contact,     [ 'change' ], contactRule );

	validate( mobile,      [ 'change' ], mobileRule );

	validate( email,       [ 'change' ], emailRule );

	province.on( 'change', function(){
		setTimeout( validateCity, 1 );
	});

	city.on( 'change', function(){
		setTimeout( validateCity, 1 );
	});

	strict.on( 'change', function(){
		setTimeout( validateCity, 1 );
	});

	function validateCity(){
		if( province.val() == '0' || city.val() == '0' ||  ( strict.css( 'display' ) != 'none' && strict.val() == '0' ) ){
			$( '.join_prompt_city' ).html( '地址不能为空' );
			return false;
		}
		$( '.join_prompt_city' ).html( '' );
	}

	function validateAll(){
		
		return validate( corpName,    corpNameRule )
			&& validate( address,     addressRule )
			&& validate( businessId,  businessIdRule )
			&& validate( legalPerson, legalPersonRule )
			&& validate( idCard,      idCardRule )
			&& validate( contact,     contactRule )
			&& validate( mobile,      mobileRule )
			&& validate( email,       emailRule );

	}
	*/
	/******************************************
	申请会员提交
	********************************************/
	$( '#joinForm' ).on( 'submit', function(){
		
		/*
		if( validateAll() !== true ){
			return false;
		}
		*/
		
		var data = {
			corpName          : corpName.val(),
			corpRegisterYear  : registerYear.val(),
			corpEmpNum        : size.val(),
			provinceCode      : '33',//province.val(),
			cityCode          : '3301',//city.val(),
			areaCode          : '330102',//strict.val(),
			address           : address.val(),
			regCode           : businessId.val(),
			legalPersonName   : legalPerson.val(),
			legalPersonCertId : idCard.val(),
			contactName       : contact.val(),
			mobile            : mobile.val(),
			email             : email.val(),
			cats              : model.val() + ':' + partner.val()
		};
				
		$.ajax({
			url: basePath + '/user/apply',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == 0 ){
					$.cookies.set( 'corpname', corpName.val() );
					window.location.href = '/user/info';
					return;
				}
				//dialog.show( DOC.errorCode[ ret.code ] || '系统错误: ' + ret.code, ret.code || 0 );
				
			}
		});

		return false;

	});

	/******************************************
	创建年份
	********************************************/
	function createYear(){
		
		var i = 2015,
			ys = [];

		while( i > 1990 ){
			ys.push( $( '<option>' ).attr( 'value', i ).html( i-- ) );
		}
		registerYear.append( ys );

	}

	/******************************************
	入口
	********************************************/
	!function(){

		//区域联动框
		//area.initComplexArea( 'province', 'city', 'strict', '33', '3301', '330106' );
		createYear();

	}();

});
