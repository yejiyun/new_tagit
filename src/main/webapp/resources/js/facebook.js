(function() {
	window.Facebook = function(appId) {
		var self = this;
		self.session = {
				user_id: "",
				ide_num: ""
		}
		
		FB.init({
			appId : appId,
			xfbml : true,
			version : 'v2.7',
			status : true
		});
		
		self.getLoginStatus = function(methods) {
			if (methods) {
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						if(methods.on)
							methods.on(response);
					} else if (response.status === 'not_authorized') {
						if(methods.notAuth)
							methods.notAuth(response);
					} else {
						if(methods.off)
							methods.off(response);
					}
				}, true);
			} else {
				console.error("methods is null");
			}
		}
	};
})();

window.fbAsyncInit = function() {
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id))
		return;
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/ko_KR/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));