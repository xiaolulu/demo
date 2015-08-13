require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
		validate: 'widget/validate/validate',
		mdialog: 'widget/mdialog/mdialog'
	}
})

define( [ 'mdialog', 'all'], function( Mdialog ){

	$( '#corpname' ).html( companyName || '仟金顶网络科技' ); 

	var mdialog = new Mdialog();
	mdialog.show( '会员申请成功!<br />小仟将尽快为您提供授信服务！' );
});
