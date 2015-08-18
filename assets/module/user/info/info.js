
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
	}
})
define(['all'], function(){

	var corpName    = $( '#corpName' ),
		businessId  = $( '#businessId' ),
		legalPerson = $( '#legalPerson' ),
		idCard      = $( '#idCard' ),
		address     = $( '#address' ),
		contact     = $( '#contact' ),
		registerYear= $( '#registerYear' ),
		size        = $( '#size' ),
		mobile      = $( '#mobile' );
	
	/******************************************
	获取用户信息
	********************************************/
	function render( config ){
		businessId.html( config.regCode );
		corpName.html( config.corpName );
		legalPerson.html( config.legalPersonName );
		idCard.html( config.legalPersonCertId );
		address.html(  config.address );
		contact.html( config.contactName );
		registerYear.html( config.corpRegisterYear );
		size.html( ['50以下','50-500','500-1000','1000以上'][config.corpEmpNum] );
		mobile.html( config.mobile );
	}

	//area.area_array[ config.provinceCode ] + area.sub_array[ config.provinceCode ][ config.cityCode] + ( area.sub_arr[ config.cityCode ] ? area.sub_arr[ config.cityCode][ config.areaCode ] : '' ) +

	function fetchUserInfo(){

		var data = {}

		$.ajax({
			url: basePath + '/user/fetchInfo',
			type: 'get',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == 0 ){
					$.cookies.set( 'corpname', ret.data.corpName)
					render( ret.data );
					return;
				} else if( ret.code == '101001002' ){
					window.location.href = '/user/join';
				}
				//dialog.show( DOC.errorCode[ ret.code ] || '系统错误: ' + ret.code, ret.code || 0 );
				
			}
		});
	}

	/******************************************
	入口
	********************************************/
	!function(){

		fetchUserInfo()

	}();
   
});
