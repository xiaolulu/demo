require.config({
	baseUrl: basePath,
	paths: {
		areaData: 'widget/area/areaData',
		base: '../../core/js/base',
	}
})
define([ 'areaData', 'base' ], function( areaData, base ){

	var province = areaData.area_array,
		city = areaData.sub_array,
		county = areaData.sub_arr;
	
	function Area( config ){
		this.source = config.source;
		this.fill = config.fill;
		this.init();
	
	}

	base.apply( Area.prototype, {

		init: function(){
			this.render();
		},

		render: function(){
			
			this.wrapper = $( '<div>' ).addClass( 'Area_wrapper hide' );
			this.provinceBox = $( '<div>' ).addClass( 'Area_province' ),
			this.cityBox = $( '<div>' ).addClass( 'Area_city hide' ),
			this.countyBox = $( '<div>' ).addClass( 'Area_county hide' );
			var _provinceEl = this.province();
			this.wrapper.append( [ this.provinceBox, this.cityBox, this.countyBox ] );
			this.mask = $( '<div>' ).addClass( 'Area_mask hide' );
			this.handler();
			$( 'body' ).append( [this.mask, this.wrapper] );

		},

		province: function(){
			var items = [];
			var i = 1,
				c;
				l = province.length;
			for(; i < l; i++ ){
				c = province[i]
				if( !c ){
					continue;
				}
				items.push( this.createProvince( c, i ) );
			}
			this.provinceBox.append( items );
		},

		createProvince: function( v, i ){
			var me = this;
			var el = $( '<li>' ).html( v );
			el.on( 'click', function(){
				province;
				city;
				me.city( i );
			});
			return el;
		},

		city: function( key ){
			var items = [],
				_city = city[ key ];
			var i = 1,
				c;
				l = _city.length;
			for(; i < l; i++ ){
				c = _city[i]
				if( !c ){
					continue;
				}
				items.push( this.createCity( c, i ) );
			}
			this.cityBox.append( items ).show();
		},

		createCity: function( v, i ){

			var me = this;
			var el = $( '<li>' ).html( v );
			el.on( 'click', function(){
				province;
				city;
				county;
				if( county[i] ){
					me.county( i );
				} else {
					me.fillIn( i );
				}
			});
			return el;

		},

		county: function( key ){
			var items = [],
				_county = county[ key ];
			var i = 1,
				c;
				l = _county.length;
			for(; i < l; i++ ){
				c = _county[i]
				if( !c ){
					continue;
				}
				items.push( this.createCounty( c, i ) );
			}
			this.countyBox.append( items ).show();
		},

		createCounty: function( v, i ){

			var me = this;
			var el = $( '<li>' ).html( v );
			el.on( 'click', function(){
				me.fillIn( i );
			});
			return el;

		},

		fillIn: function( v ){
			console.log( v );
			this.hide();
			v = v + '';
			var _pcode = v.slice( 0, 2 ),
				_ccode = v.slice( 0, 4 ),
				txt = '';
			if( ['11', '12', '31', '50', '71', '81', '82'].indexOf( _pcode ) > -1 ){
				txt = province[ _pcode ] + city[ _pcode ][ v ]; 
			} else {
				txt = province[ _pcode ] + city[ _pcode ][ _ccode ] + county[ _ccode][ v ]
			}
			this.fill.val( txt );
			this.fill.attr( 'data', v );
			
		},

		hide: function(){

			this.wrapper.hide();
			this.mask.hide();
			this.cityBox.html('').hide();
			this.countyBox.html('').hide();

		},

		show: function(){
			
			this.wrapper.show();
			this.mask.show();
			
		},

		handler: function(){
			var me = this;
			this.source.on( 'click', function(){
				me.show();
			});
			this.mask.on( 'click', function(){
				me.hide();
			})
			
		}


	})

	
	
	return Area

})

