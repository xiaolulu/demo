
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		doc: 'public/js/zhdoc',
		validate: 'public/js/validate',
		area: 'widget/area/area'
	}
})
define(['doc', 'validate', 'area', 'all'], function( DOC, validate, Area ){
   var corpName     = $( '#corpName' ),
		registerYear = $( '#registerYear' ),
		size         = $( '#size' ),
		city         = $( '#city' ),
		address      = $( '#address' ),
		businessId   = $( '#businessId' ),
		legalPerson  = $( '#legalPerson' ),
		idCard       = $( '#idCard' ),
		contact      = $( '#contact' ),
		mobile       = $( '#mobile' ),
		model		 = $( '#model' ),
		partner      = $( '#model' ),
		email        = $( '#email' );

	new Area( { source: city, fill: city } );
	
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
				if( prompt ){
					alert( prompt );
				}
			}	
		],
		cityRule = [
			{ 
				'noBlank': '请输入公司地址'
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			}	
		],
		addressRule = [
			{ 
				'noBlank': '请输入公司地址',
				'min'    : [1, '不能少于1位'], 
				'max'    : [30, '不能多于30位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			}	
		],
		businessIdRule = [
			{ 
				'noBlank': '请输入工商注册号', 
				'typeNum': '请输入数字', 
				'min'    : [13, '不能少于13位'], 
				'max'    : [15, '不能多于15位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		partnerRule = [
			{ 
				'noBlank': '请输入合作厂家名称', 
				'typeZEI' : '只允许输入中英文',
				'min'    : [8, '不能少于8位'], 
				'max'    : [25, '不能多于25位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		legalPersonRule = [
			{ 
				'noBlank': '请输入法定代表人', 
				'typeZh' : '请输入中文', 
				'min'    : [2, '不能少于2位'], 
				'max'    : [5, '不能多于5位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		idCardRule = [
			{ 
				'noBlank'   : '请输入身份证号', 
				'typeIdCard': '身份证号无效'
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		contactRule = [
			{ 
				'noBlank': '请输入常用联系人', 
				'typeZh' : '请输入中文', 
				'min'    : [2, '不能少于2位'], 
				'max'    : [5, '不能多于5位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		mobileRule = [
			{ 
				'noBlank': '请输入手机号码', 
				'typePhone': '手机格式不正确', 
				'min'    : [11, '不能少于11位'], 
				'max'    : [11, '不能多于11位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		emailRule = [
			{ 
				'noBlank'  : '请输入邮箱', 
				'typeEmail': '邮箱格式不正确'
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		];
	
	validate( corpName,    [ 'change' ], corpNameRule );

	validate( address,     [ 'change' ], addressRule );

	validate( city,        [ 'change' ], cityRule );

	validate( businessId,  [ 'change' ], businessIdRule );

	validate( legalPerson, [ 'change' ], legalPersonRule );

	validate( idCard,      [ 'change' ], idCardRule );

	validate( contact,     [ 'change' ], contactRule );

	validate( mobile,      [ 'change' ], mobileRule );

	validate( email,       [ 'change' ], emailRule );
	

	function validateAll(){
		
		return validate( corpName,    corpNameRule )
			&& validate( address,     addressRule )
			&& validate( city,     	  cityRule )
			&& validate( businessId,  businessIdRule )
			&& validate( legalPerson, legalPersonRule )
			&& validate( idCard,      idCardRule )
			&& validate( contact,     contactRule )
			&& validate( mobile,      mobileRule )
			&& validate( email,       emailRule );

	}
	/******************************************
	申请会员提交
	********************************************/
	$( '#userjoinBox' ).on( 'submit', function(){
		
		
		if( validateAll() !== true ){
			return false;
		}

		var cityCode = city.attr( 'data' );
		
		var data = {
			corpName          : corpName.val(),
			corpRegisterYear  : registerYear.val(),
			corpEmpNum        : size.val(),
			provinceCode      : cityCode.slice( 0, 2 ),
			cityCode          : cityCode.slice( 0, 4 ),
			areaCode          : cityCode,
			address           : address.val(),
			regCode           : businessId.val(),
			legalPersonName   : legalPerson.val(),
			legalPersonCertId : idCard.val(),
			contactName       : contact.val(),
			mobile            : mobile.val(),
			email             : 'jianggc@126.com',
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
				} else {
					alert( DOC.errorCode[ ret.code ] )
				}
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
