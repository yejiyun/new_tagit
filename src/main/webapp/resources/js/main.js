(function() {
    $(window).load(function() {
        window._modules = {
            aside: new Modules($("aside#get")),
            detail: new Modules($("div.card_detail"))
        };
    });

    var asideGet = function() {
        var aside = _modules.aside.init();
        aside.find(".header .btn_close").click(function() {
            aside.animate({
                opacity: 0
            }, 300, function() {
                aside.remove();
            });
        });
        aside.find(".tokenizer").remove();
        aside.find(".txt_tags").tokenizer();

        aside.addClass("show");

        var setFeed = function(feed) {
            var data = feed.data[0];
	        if(feed.data.length) {
	            
	            if(!data.picture)
	            	data.picture = "/resources/images/sample/no-image.png";
	
	            aside.find(".article").attr("data-id", data.id);
	            aside.find(".article .content").text(data.message || data.name);
	            aside.find(".article .thumbnail .image").css("background-image", "url(" + data.picture + "), url(/resources/images/sample/no-image.png)");
	
	            if (feed.paging) {
	            	var getPaging = function(url) {
	            		if(url) {
		            		var xmlHttpRequest = new XMLHttpRequest();
		                    xmlHttpRequest.onreadystatechange = function () {
		                        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
		                            var feed = JSON.parse(xmlHttpRequest.responseText);
		                            setFeed(feed);
		                        }
		                    };
		                    xmlHttpRequest.open("GET", url, true);
		                    xmlHttpRequest.send();
	                    }
	            	}
	                aside.find(".article .thumbnail .prev").off("click").on("click", function(){getPaging(feed.paging.previous);});
	                aside.find(".article .thumbnail .next").off("click").on("click", function(){getPaging(feed.paging.next);});
	            }
	
	            $("body").append(aside);
            } else {
            	alert("마지막 게시글입니다.");
            }
        }

        var face = new Facebook("1761310170777246");
        FB.feedFields = "application, name, link, type, privacy, id, object_id, picture, source, message, description, story, caption, created_time, properties";
        face.getLoginStatus({
            on: function(response) {
                FB.api("/me/feed", "GET", {
                    fields: FB.feedFields,
                    limit: 1
                }, setFeed);
            }
        });
    }

    $(".fixed_header #get").on("click", asideGet);
})();