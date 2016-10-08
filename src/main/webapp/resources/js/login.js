var uiFixer = {
	logo : function() {
		var wrap = $("article .wrap");
		wrap.css("top", ($("article").height() - wrap.height()) / 2 + "px");
	}
};

window.onload = function() {
	uiFixer.logo();
};
window.onresize = function() {
	uiFixer.logo();
};

$(function() {
	$("#login_btn").click(function(event) {
		var face = new Facebook("1761310170777246");
		face.getLoginStatus({
			on : function(response) {
				FB.api('/me', 'GET', {
					"fields" : "id,email"
				}, function(response) {
					console.log(response);
					face.session.ide_num = response.id;
					face.session.user_id = response.email;
					
					$.ajax({
						url: "/login",
						method :"POST",
						contentType : "application/json; charset=UTF-8",
						data : JSON.stringify(face.session),
						dataType : "json",
						success : function(response) {
							if(response.state) {
								eval(response.action);
							} else {
								alert(response.message);
							}
						}
					});
				});
				console.log("로그인");
			},
			off : function(response) {
				FB.login(function (response) {
                    if (response.status === 'connected') {
                        location.reload();
                    } else {
                        alert("로그인에 실패하였습니다.");
                    }
                }, {
                    scope: 'email, user_photos, user_posts',
                    return_scopes: true
                });
			},
			notAuth : function(response) {
				FB.login(function (response) {
                    if (response.status === 'connected') {
                        location.reload();
                    } else {
                        alert("로그인에 실패하였습니다.");
                    }
                }, {
                    scope: 'email, user_photos, user_posts, user_videos',
                    return_scopes: true
                });
			}
		});
	});
});