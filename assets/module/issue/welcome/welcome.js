require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		validate: 'widget/validate/validate',
		doc: 'public/js/zhdoc'
	}
})

define( ['all'], function(){

	$( '#corpname' ).html( companyName || '仟金顶网络科技' ); 
	
});
