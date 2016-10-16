(function() {
    $(window).load(function() {
    	// Pre-parsing and Caching Templates
        window._global = {
        	page: 0,
	        modules: {
	            aside: new Modules($("aside#get")),
	            detail: new Modules($("div.card_detail"))
	        },
	        async: {
	        	infinite_scroll: true
	        }
        };
        
        $("script[type=x-tmpl-mustache]").each(function(){
        	_global[$(this).attr("id")] = $(this).html();
        	Mustache.parse(_global[$(this).attr("id")]);
        });
    });
    
    $(window).scroll(function(event){
    	// infinite scroll
    	if(_global != null) {
	    	if(_global.async.infinite_scroll) {
		    	if(Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()){
		    		_global.async.infinite_scroll = false;
		    		_global.page++;
		    		
		    		$.ajax({
		        		url: "/api/tag/bundle",
		        		method :"POST",
		        		data : {"page": _global.page},
		        		success : function(response) {
		        			console.log(response);
		        			if(response.state) {
		        				var data = response.data, size;
		        				_global.async.infinite_scroll = true;
		        				
		        				for(var idx in data) {
		        					var tag = data[idx];
			        				if(tag.list.length < 2) {
			        					size = "01";
			        				} else if(tag.list.length < 3) {
			        					size = "02";
			        				} else if(tag.list.length < 4) {
			        					size = "03";
			        				} else {
			        					size = "04";
			        				}
			        				
			        				var param = {
			        						tagName: tag.name,
			        						layout: size,
			        						items: tag.list
			        				}
			        				$("article#main .wrap").append(Mustache.render(_global.mt_tag_bundle, param));
		        				} 
		        			} else {
	        					$("article#main .more").remove();
	        				}
		        		}
					});
		        }
	    	}
    	}
    });
    
    $(".fixed_header #get").on("click", asideGet);
    
    $(document).on("click", "article.tiles section.tag_bundle article.items .item", function(){
    	var detail = _global.modules.detail.init();
    	detail.find(".header .btn_back").click(function() {
            detail.animate({
                opacity: 0
            }, 300, function() {
                detail.remove();
            });
        });
    });

    function asideGet() {
        var aside = _global.modules.aside.init();
        aside.find(".header .btn_close").click(function() {
            aside.animate({
                opacity: 0
            }, 300, function() {
                aside.remove();
            });
        });
        aside.find(".footer .btn_apply").click(function(){
        	var thumbnail = aside.find(".article .thumbnail .image").css("background-image"), tags = [];
        	aside.find(".tokenizer li span.label").each(function(){ tags.push($(this).text()); });
        	var data = {
        			attachment: aside.find(".article").attr("data-id"),
	        		url: aside.find(".article .thumbnail .image").attr("data-url"),
	        		content: aside.find(".article .content").text(),
	        		thumbnail: thumbnail.substr(5, thumbnail.length-2),
	        		memo: aside.find(".article .memo .body .txt_memo").val(),	
	        		tags: tags.join(",")        		
        	}
        	$.ajax({
        		url: "/api/item/add",
        		method :"POST",
        		data : data,
        		success : function(response) {
        			if(response.state) {
	        			aside.find(".txt_tags").attr("value","");
	        			aside.find(".tokenizer li span.label").each(function(){$(this).parent().remove();});
	        			aside.find(".txt_memo").val("");
	        		}
	        		
	        		if(response.message) {
	        			alert(response.message);
	        		}
        		}
			});
        });
        aside.find(".tokenizer").remove();
        aside.find(".txt_tags").tokenizer();

        aside.addClass("show");

        var setFeed = function(feed) {
            var data = feed.data[0];
            console.log(data);
	        if(feed.data.length) {
	            
	            if(!data.picture)
	            	data.picture = "/resources/images/sample/no-image.png";
	
	            aside.find(".article").attr("data-id", data.id);
	            aside.find(".article .content").text(data.message || data.name);
	            aside.find(".article .thumbnail .image").css("background-image", "url(" + data.picture + ")");
	            aside.find(".article .thumbnail .image").off("click");
	            if(data.link) {
		            aside.find(".article .thumbnail .image").attr("data-url", data.link);
		            aside.find(".article .thumbnail .image").on("click", function(){ window.open($(this).attr("data-url"))});
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