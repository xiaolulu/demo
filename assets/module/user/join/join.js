
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		doc: 'public/js/zhdoc',
		validate: 'public/js/validate',
		area: 'widget/area/area',
		mdialog: 'widget/mdialog/mdialog'
	}
})
define(['doc', 'validate', 'area', 'mdialog', 'all'], function( DOC, validate, Area, Mdialog ){
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
		partner      = $( '#partner' ),
		email        = $( '#email' );

	new Area( { source: city, fill: city } );
	
	mobile.val( $.cookies.get( 'username' ) || '' );
	
	/******************************************
	创建验证规则
	********************************************/
	var corpNameRule = [
			{ 
				'noBlank': '请输入公司名称',
				'typeZEI' : '公司名称只允许输入中英文',
				'min'    : [8, '公司名称不能少于8位'], 
				'max'    : [25, '公司名称不能多于25位'] 
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
				'min'    : [1, '公司地址不能少于1位'], 
				'max'    : [30, '公司地址不能多于30位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			}	
		],
		businessIdRule = [
			{ 
				'noBlank': '请输入工商注册号', 
				'typeNum': '工商注册号请输入数字', 
				'min'    : [13, '工商注册号不能少于13位'], 
				'max'    : [15, '工商注册号不能多于15位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		partnerRule = [
			{ 
				'noBlank': '请输入合作厂家名称', 
				'typeZEI' : '合作厂家名称只允许输入中英文',
				'min'    : [8, '合作厂家名称不能少于8位'], 
				'max'    : [25, '合作厂家名称不能多于25位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		legalPersonRule = [
			{ 
				'noBlank': '请输入法定代表人', 
				'typeZh' : '法定代表人请输入中文', 
				'min'    : [2, '法定代表人不能少于2位'], 
				'max'    : [5, '法定代表人不能多于5位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		idCardRule = [
			{ 
				'noBlank'   : '请输入身份证号' 
				//'typeIdCard': '身份证号无效'
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		contactRule = [
			{ 
				'noBlank': '请输入常用联系人', 
				'typeZh' : '常用联系人请输入中文', 
				'min'    : [2, '常用联系人不能少于2位'], 
				'max'    : [5, '常用联系人不能多于5位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			} 
		],
		mobileRule = [
			{ 
				'noBlank': '请输入手机号码', 
				'typePhone': '手机格式不正确' 
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

	validate( partner,     [ 'change' ], partnerRule );

	validate( idCard,      [ 'change' ], idCardRule );

	validate( contact,     [ 'change' ], contactRule );

	validate( mobile,      [ 'change' ], mobileRule );

	validate( email,       [ 'change' ], emailRule );
	

	function validateAll(){
		
		return validate( corpName,    corpNameRule )
			&& validate( address,     addressRule )
			&& validate( city,     	  cityRule )
			&& validate( businessId,  businessIdRule )
			&& validate( partner, partnerRule )
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

		var cityCode = city.attr( 'data' ),
			_provinceCode = cityCode.slice( 0, 2 ),
			_cityCode = cityCode.slice( 0, 4 ),
			_areaCode = cityCode;
		
		if( ['11','12','31','50','71','81','82'].indexOf( _provinceCode ) > -1 ){
			_cityCode = _areaCode;
			_areaCode = 0;
		}	
		
		var data = {
			corpName          : corpName.val(),
			corpRegisterYear  : registerYear.val(),
			corpEmpNum        : size.val(),
			provinceCode      : _provinceCode,
			cityCode          : _cityCode,
			areaCode          : _areaCode,
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
					window.location.href = '/welcome';
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

	var mdialog = new Mdialog();

	/******************************************
	入口
	********************************************/
	!function(){

		//区域联动框
		//area.initComplexArea( 'province', 'city', 'strict', '33', '3301', '330106' );
		createYear();
		if( location.hash == '#register' ){
			mdialog.show( '注册成功！<br />马上成长仟金顶会员，申请项目借款！' );
		}

	}();

});
