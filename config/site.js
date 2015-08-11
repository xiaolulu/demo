
var siteTitle = '仟金顶网络科技',
      pageTitle = {
		    '/': '首页',
		    '/index': '首页',
		    '/register': '注册',
		    '/login': '登录',
		    '/user/join': '会员申请',
		    '/user/info': '会员信息',
		    '/user/partner': '合作厂家'
	    },
       basePath = 'http://iwx.qjdchina.com'

module.exports = {
	siteTitle: siteTitle,
	pageTitle: pageTitle,
	basePath: basePath, 
	setting: function( req, path, file ){
		return {
			title:       pageTitle[ req.path ] + '-' + siteTitle,
			basePath:    basePath,
			currentPage: ( path || '' ) + ( file || req.path.replace(/(\/[a-z|A-Z]*)?$/,function($1){ ;return $1 + $1}) ),
		}
	}
}
