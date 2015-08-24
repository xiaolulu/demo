
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		validate: 'public/js/validate',
		doc: 'public/js/zhdoc'
	}
})
define(['doc','validate','all'], function(DOC, validate){
   /******************************************
	定义变量
	********************************************/
	var addNewPartner = $( '#addNewPartner' ),
		addPartnerForm = $( '#addPartner' );

	var partnersGrid = $( '#partnersGrid' ),
		model        = $( '#partnerModel' ),
		company      = $( '#partnerCompany' ),
		MODEL        = DOC.parterModelNum;

	var companyRule = [
		{ 
			'noBlank': '请输入公司名称',
			'typeZEI' : '只允许输入中英文',
			'min': [8, '不能少于8位'], 
			'max': [25, '不能多于25位'] 
		}, function( prompt){
			$( '.partner_company_prompt' ).html( prompt );
		}	
	];
	
	validate( company, [ 'change' ], companyRule );

	var data = [
		{categoryCode:1,factoryName:'海尔电器有限公司',authFile:0},
		{categoryCode:1,factoryName:'海尔电器有限公司',authFile:1},
		{categoryCode:1,factoryName:'海尔电器有限公司',authFile:0}
	]
	
	/******************************************
	获取合作厂家
	********************************************/
	function fetchPartners(){

		var data = {}
		
		$.ajax({
			url: basePath + '/user/fetchPartners?' + Math.random(),
			type: 'get',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == 0 ){
					render( ret.data );
				} else {
					alert( DOC.errorCode[ ret.code ] )
				}
			}
		});

	}
	
	var i = 0;

	function render( data ){
		
		var els = [],
			l   = data.length;
		while( i < l ){
			els.push( create( data[i++], i ) );
		}
		partnersGrid.append( els );

	}

	var tmp = ['<span class="index fl">{index}</span>',
				'<p class="info fr"><span class="company ellipsis">{factoryName}</span>',
				'<span class="model">【{model}】</span><span class="status {statusCls}">审核状态：{status}</span></p>'].join('');
	
	function create( config, index ){
		var status = '';
		config.index = index;
		config.model = MODEL[ config.categoryCode ];
	
		if( config.authFile ){
			config.status = '上传成功';
			config.statusCls = '';
		} else {
			config.status = '未上传证书';
			config.statusCls = 'statusb';
		}
		var _html = tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return config[ $2 ];
			});
		
		return $( '<div>' ).append( _html ).addClass( 'partnerItem clearfix' );
	}
	
	/******************************************
	创建品类下拉框
	********************************************/
	function createModel( items ){
		
		var v,
			os = [];
		for( v in items ){
			os.push( $( '<option>' ).attr( 'value', v ).html( items[ v ] ) );
		}
		model.append( os );

	}

	var companyRule = [
			{ 
				'noBlank': '请输入公司名称',
				'typeZEI' : '只允许输入中英文',
				'min': [8, '不能少于8位'], 
				'max': [25, '不能多于25位'] 
			}, function( prompt){
				if( prompt ){
					alert( prompt );
				}
			}	
		];
	
	//validate( company, [ 'change' ], companyRule );

	/******************************************
	新增合作厂家
	********************************************/
	$( '#addPartner' ).on( 'submit', function(){
		
		if( validate( company, companyRule ) !== true ){
			return false;
		}

		var data = {
			categoryCode : model.val(),
			factoryName  : company.val(),
		};
				
		$.ajax({
			url: basePath + '/user/addPartners',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == 0 ){
					data.id = ret.data.id;
					partnersGrid.append( create( data, ++i ) );
					company.val('');
				} else {
					alert( DOC.errorCode[ ret.code ] )
				}
			}
		});

		return false;

	});

	addNewPartner.on( 'click', function(){
		addNewPartner.hide();
		addPartnerForm.show();
	});

	$( '.btn_cancel' ).on( 'click', function(){
		addNewPartnerHide();
	})

	function addNewPartnerHide(){
		addNewPartner.show();
		addPartnerForm.hide();
		model.val( 1 );
		company.val( '' );
		//$( '.partner_company_prompt' ).html( '' );
	}

	/******************************************
	初始化
	********************************************/
	!function(){
		
		createModel( MODEL );

		fetchPartners();

	}()
});
