
require.config({
	baseUrl: basePath,
	paths: {
		
	}
})

define(function(  ){

	var isArray = function( value ){
		return Object.prototype.toString.call( value ) == '[object Array]'
	}
	
	var Regular = {
	
		noBlank: function( value ){
			return !!value;
		},

		min: function( value, rule ){
			return value.length >= rule;
		},

		max: function( value, rule ){
			return value.length <= rule;
		},

		typeZh: function( value ){
			return /^[\u4E00-\u9FA5\uf900-\ufa2d\uFE30-\uFFA0]+$/.test( value );
		},

		typeZEI: function( value ){
			return /^[\u4E00-\u9FA5\uf900-\ufa2d\uFE30-\uFFA0a-zA-Z\(\)\-\_]+$/.test( value );
		},
		
		typeZE: function( value ){
			return /^[\u4E00-\u9FA5\uf900-\ufa2d\uFE30-\uFFA0a-zA-Z]+$/.test( value );
		},

		typeEN: function( value ){
			return /^[0-9|a-z|A-Z]+$/.test( value );
		},

		typeNum: function( value ){
			return !isNaN( value );
		},

		typePhone: function( value ){
			return /^1[0-9]{10}$/.test( value );
		},

		typeEmail: function( value ){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
		},

		typeIdCard: function( value ){
			return cardId( value );
		}

	}

	function check( rules, cb ){
	
		var rule,
			prompt,
			codex,
			value = this.value;
		for ( rule in rules ){

			prompt = rules[ rule ];
			isArray( prompt ) && ( codex = prompt[0] ) && ( prompt = prompt[1] );

			if( rule == 'self' ){
				if( rules[ rule ].call( this, cb ) !== true ){
					return false;
				};
			} else if( !Regular[ rule ]( value, codex ) ){
				cb( prompt )
				return false;
			}
			cb( '' );
		}
		return true;

	}

	function validate( el, events, rules, cb ){
		
		if( rules ){

			cb = rules[1];
			rules = rules[0];
			$.each( events, function( k, event ){
				el.on( event, function(){
					check.call( this, rules, cb );
				});

			});
		
		} else {
			
			cb = events[1];
			rules = events[0];
			return check.call( el.get( 0 ), rules, cb );
		
		}

	}
	
	return validate

})
