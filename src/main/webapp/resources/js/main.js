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
	        },
	        face: new Facebook("1761310170777246")
        };
        
        FB.feedFields = "application, name, link, type, privacy, id, object_id, picture, source, message, description, story, caption, created_time, properties";
        
        $("script[type=x-tmpl-mustache]").each(function(){
        	_global[$(this).attr("id")] = $(this).html();
        	Mustache.parse(_global[$(this).attr("id")]);
        });
    });
    
    $(window).scroll(function(event){
    	// infinite scroll
    	if(_global != null) {
	    	if(_global.async.infinite_scroll) {
	    		$("article#main .scroll.more").hide();
	    		
	    		if($("article#main").hasClass("detail"))
	    			return;
	    		
		    	if(Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()){
		    		_global.async.infinite_scroll = false;
		    		_global.page++;

					$("article#main .scroll.more").show();
		    		
		    		$.ajax({
		        		url: "/api/tag/bundle",
		        		method :"POST",
		        		data : {"page": _global.page},
		        		success : function(response) {
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
	        					$("article#main .scroll.more").hide();
		        			} else {
	        					$("article#main .scroll.more").remove();
	        				}
		        		}
					});
		        }
	    	}
    	}
    });
    
    $(document).on("click", ".tag_bundle header", function(){
    	location.href = "/search/" + $(this).find("span").text();
    });
    $(".fixed_header #get").on("click", asideGet);
    $(document).on("click", ".items .item", divDetail);
    
    function divDetail() {
    	$("header#header").removeClass("open");
    	var itemId = $(this).attr("data-id");
    	
    	var detail = _global.modules.detail.init();
    	
    	detail.attr("scroll_top", $(window).scrollTop());
    	detail.find(".header .btn_back").click(function() {
        	$("article#main").removeClass("detail");
        	$(window).scrollTop(detail.attr("scroll_top"));
        	detail.remove();
        });
    	
    	detail.attr("data-id", itemId);

    	$.ajax({
    		url: "/api/item/" + itemId,
    		method :"GET",
    		success : function(response) {
    			if(response.state) {
					var imgPage = detail.find(".header .wrap .page");
					var postId = response.data.attachment;
					
    				detail.find(".article .image img").attr("src", response.data.thumbnail);
    				detail.find(".article .content .wrap .wrap").text(response.data.content);
    				if(response.data.thumbnail == "") {
    					imgPage.text("");
    					detail.find(".article .image").remove();
    					$("article#main").addClass("detail");
        		    	$("article#main .wrap").append(detail);
    				} else {
    			        _global.face.getLoginStatus({
    			            on: function(response) {
    			            	FB.api("/" + postId + "/attachments", "GET", null, function (obj) {
    		                        if(obj.data.length > 0) {
    		                            var images = [];
    		                            for(var idx in obj.data) {
    		                                var data = {
    		                                    media: obj.data[idx].media,
    		                                    subattachments: obj.data[idx].subattachments
    		                                };
    		                                if(data.media) {
    		                                	images.push(data.media.image.src);
    		                                }
    		                                if(data.subattachments) {
    		                                    for(var subIdx in data.subattachments.data) {
    		                                        var subData = data.subattachments.data[subIdx];
    		                                    	images.push(subData.media.image.src);
    		                                    }
    		                                }
    		                            }
    		                            
    		                            _global.images = images;
    		                            
    		                            if(imgPage.attr("data-page") == null)
    		                            	imgPage.attr("data-page", 0);
    		                            
    		                            var swipeImageLeft = function () {
    		                            	var page = parseInt(imgPage.attr("data-page") || 1);
    		                            	if(_global.images.length > 0) {
        		                				detail.find(".article .image img").attr("src", _global.images[page++]);
        		                            }
        		                            
    		                            	if(page <= _global.images.length) {
	        		                            imgPage.attr("data-page", page);
	        		                            imgPage.text(page + "/" + _global.images.length);
    		                            	}
    		                            }
    		                            var swipeImageRight = function () {
    		                            	var page = parseInt(imgPage.attr("data-page") || 0);    		                            
        		                            
    		                            	if(page-- > 1) {
	        		                            imgPage.attr("data-page", page)
	        		                            imgPage.text(imgPage.attr("data-page") + "/" + _global.images.length);
    		                            	}
    		                            	
    		                            	if(_global.images.length > 0) {
        		                				detail.find(".article .image img").attr("src", _global.images[page-1]);
        		                            }
    		                            }
    		                            detail.find(".article").on({
    		                            	"swipeleft": swipeImageLeft,
    		                            	"swiperight": swipeImageRight
    		                            });
    		                            swipeImageLeft();
    		                        }
    		                        else {
    		                        	imgPage.remove();
    		                        }

		            				detail.find(".article .content .wrap .wrap").on("click", function(){
		            					var article = $(this).parents(".article");
		            					article.toggleClass("more");
		            				});
		                            
		                            $("article#main").addClass("detail");
		            		    	$("article#main .wrap").append(detail);
    		                    });
    			            }
    			        });
    				}
        		}
    		}
		});
    }

    function asideGet() {
    	$("header#header").removeClass("open");
        var aside = _global.modules.aside.init();
        aside.find(".header .btn_close").click(function() {
            aside.animate({
                opacity: 0
            }, 300, function() {
            	//aside.remove();
				location.reload();
            });
        });
        aside.find(".footer .btn_apply").click(function(){
        	var thumbnail = aside.find(".article .thumbnail .image").attr("data-thumbnail"), tags = [];
        	aside.find(".tokenizer li span.label").each(function(){ tags.push($(this).text()); });
        	var data = {
        			attachment: aside.find(".article").attr("data-id"),
	        		url: aside.find(".article .thumbnail .image").attr("data-url"),
	        		content: aside.find(".article .content").text(),
	        		thumbnail: thumbnail,
	        		memo: aside.find(".article .memo .body .txt_memo").val(),	
	        		tags: tags.join(",")        		
        	}
			if(tags.length <= 0) {
				alert("태그를 1개 이상 지정 해주셔야 합니다.");
				return false;
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
	        if(feed.data.length) {
				if (aside.find(".txt_tags").attr("value") != ""
						|| aside.find(".txt_memo").val() != "") {
					if(confirm("작성하던 내용이 존재 합니다.\n무시하고 진행 하시곘습니까?")) {
						aside.find(".txt_tags").attr("value", "");
						aside.find(".tokenizer li span.label").each(function() {
							$(this).parent().remove();
						});
						aside.find(".txt_memo").val("");
					}
					return false;
				}
	            
	            if(!data.picture)
	            	data.picture = "/resources/images/sample/no-image.png";
	
	            aside.find(".article").attr("data-id", data.id);
	            aside.find(".article .content").text(data.message || data.name);
	            aside.find(".article .thumbnail .image").attr("data-thumbnail", data.picture);
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
        _global.face.getLoginStatus({
            on: function(response) {
                FB.api("/me/feed", "GET", {
                    fields: FB.feedFields,
                    limit: 1
                }, setFeed);
            }
        });
    }
})();