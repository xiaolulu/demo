
function getCookie( cookie, name ){
	try{
		var cs = cookie.split(';'),
			c,
			item;
		while( c = cs.pop() ){
			item = c.split('=');
			if( item[0].trim() == name ){
			    return item[1];
			}
		}
	} catch( e ){
		return false;
	}
    
};

module.exports = {

    getCookie: getCookie

}
