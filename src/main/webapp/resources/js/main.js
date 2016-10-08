(function() {
    $(window).load(function() {
    	// Pre-parsing and Caching Templates
        window._modules = {
            aside: new Modules($("aside#get")),
            detail: new Modules($("div.card_detail"))
        };
        
        $("script[type=x-tmpl-mustache]").each(function(){
        	_modules[$(this).attr("id")] = $(this).html();
        	Mustache.parse(_modules[$(this).attr("id")]);
        });
    });
    
    $(window).scroll(function(event){
    	// infinite scroll
    	if(Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()){
           for(i=0;i<5;i++) {
           	$("article .wrap").prepend(Mustache.render(_modules.mt_tag_bundle, {tag_content:"태그", layout:"01", items:[{item_id:3, item_thumbnail:"/resources/images/sample/cat_01.png", item_content:"content"}]}));
           }
        }
    });
    
    $(".fixed_header #get").on("click", asideGet);
    
    $(document).on("click", "article.tiles section.tag_bundle article.items .item", function(){
    	var detail = _modules.detail.init();
    	detail.find(".header .btn_back").click(function() {
            detail.animate({
                opacity: 0
            }, 300, function() {
                detail.remove();
            });
        });
    });

    function asideGet() {
        var aside = _modules.aside.init();
        aside.find(".header .btn_close").click(function() {
            aside.animate({
                opacity: 0
            }, 300, function() {
                aside.remove();
            });
        });
        aside.find(".footer .btn_apply").click(function(){
        	var thumbnail = aside.find(".article .thumbnail .image").css("background-image");
        	var data = {
        		id: aside.find(".article").data("id"),
        		url: aside.find(".article .thumbnail .image").data("url"),
        		content: aside.find(".article .content").text(),
        		thumbnail: thumbnail.substr(5, thumbnail.length-2),
        		tags: aside.find(".article .tags .body .txt_tags").val().split(","),
        		memo: aside.find(".article .memo .body .txt_memo").val()
        	}
        	
        	$.post("/item/api/add", data).done(function(response){
        		console.log(response);
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
	            if(data.link) {
		            aside.find(".article .thumbnail .image").attr("data-url", data.link);
		            aside.find(".article .thumbnail .image").click(function(){ $(location).attr("href", $(this).data("url"));});
	            }
	            
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
})();