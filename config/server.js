module.exports = {
    redis:{
		host: '10.8.0.6',
		port: '7777'
	},
	wechat: {
		host: 'https://api.weixin.qq.com',
		appid: 'wxfb96cc74703eb978',
		secret: 'd49d5f6febd267637d85c56af4370bce',
		pathToken: '/cgi-bin/token'
	},
	server: {
		host: '10.8.0.14',	//qianjinding-dev2（10.1.1.62）
		//host: '10.8.0.6', //qianjinding-dev1（10.1.1.182）
		hostname: 'qjdchina.com',
		port: '80'
	}
}
