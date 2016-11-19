$(function(){
	$(function(){
        $.event.special.tap.tapholdThreshold = 500;
        $.event.special.swipe.durationThreshold = 400;
    });
	
	
    $(document).on("focus", "aside#detail_edit .txt_memo", function(){
        $("aside").addClass("keyboard");
    });

    $(document).on("focusout", "aside#detail_edit .txt_memo", function(){
        $("aside").removeClass("keyboard");
    });

    $(document).on("taphold", ".card .tap_holder", function(event){
        $(this).parents(".card").find(".wrap.delete").addClass("show");
    });
    
    $(document).on("click", ".card .wrap.delete", function(event){
        event.stopPropagation();
        var keyword = $('#keyword').val();
        var id = $('div[data-id]').attr('data-id');
        location.href="/api/item/"+id+"/"+keyword+"/del";
        $(this).removeClass("show");
    });
    
	$(window).load(function() {
    	// Pre-parsing and Caching Templates
        window._global = {
        	page: 0,
	        modules: {
	            aside_detail: new Modules($("aside#detail_edit")),
	            aside_get: new Modules($("aside#get")),
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
	

    function asideGet() {
    	$("header#header").removeClass("open");
        var aside = _global.modules.aside_get.init();
        aside.find(".header .btn_close").click(function() {
            aside.animate({
                opacity: 0
            }, 300, function() {
                aside.remove();
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
	
	function divDetail() {
    	$("header#header").removeClass("open");
    	var itemId = $(this).parents(".card").attr("data-id");
    	
    	var detail = _global.modules.detail.init();
    	detail.find(".header .btn_back").click(function() {
        	$("article#list").removeClass("detail");
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

    		            				detail.find(".article .content .wrap .wrap").on("click", function(){
    		            					var article = $(this).parents(".article");
    		            					article.toggleClass("more");
    		            				});
    		                            
    		                            $("article#list").addClass("detail");
    		            		    	$("article#list").append(detail);
    		                        }
    		                    });
    			            }
    			        });
    				}
        		}
    		}
		});
    }
	
	var addData = function(){
		var itemId = $(this).parents(".card").attr("data-id");
		$.ajax({
    		url: "/api/item/" + itemId,
    		method :"GET",
    		success : function(response) {
    			if(response.state) {
    				var data = response.data;
    				console.log(data);
    		        var aside = _global.modules.aside_detail.init();
    		        
    		        aside.find(".header .btn_close").click(function() {
    		            aside.animate({
    		                opacity: 0
    		            }, 300, function() {
    		                aside.remove();
    		            });
    		        });
    		        
    		        aside.find(".article").attr("data-id", data.id);
    	            aside.find(".article .memo .body .txt_memo").text(data.memo);
    	            aside.find(".article .content").text(data.content);
    	            aside.find(".article .thumbnail .image").attr("data-thumbnail", data.thumbnail);
    	            aside.find(".article .thumbnail .image").css("background-image", "url(" + data.thumbnail + ")");
    	            aside.find(".article .thumbnail .image").off("click");
    	            if(data.url) {
    		            aside.find(".article .thumbnail .image").attr("data-url", data.url);
    		            aside.find(".article .thumbnail .image").on("click", function(){ window.open($(this).attr("data-url"))});
    	            }
    	            
    	            aside.find(".tokenizer").remove();
    	            aside.find(".txt_tags").attr("value", data.tagList.map(function(tag){ return tag.content;}).join(","));
    	            aside.find(".txt_tags").tokenizer();

    	            aside.addClass("show");

    	            $("body").append(aside);
    			} else {
    				if(response.message)
    					alert(response.message);
    			}
    		}
		});
	}
	
	$(document).on("click", "aside#detail_edit .footer .btn_apply", function(){
		var aside = _global.modules.aside_detail.init();
        var id = $('div[data-id]').attr('data-id');
        var tags = [];
        var memo = $('textarea').val();
        //aside.find(".tokenizer li span.label").each(function(){ tags.push($(this).text()); });
    	$('.tokenizer li span.label').each(function(){ tags.push($(this).text()); });
        var data = {
        		memo: memo,	
        		tags: tags.join(","),
        		id : id,
        		
    	}
    	console.log(data);
    	
    	$.ajax({
    		url: "/api/item/update",
    		method :"POST",
    		data : data,
    		success : function(response) {
    			if(response.state) {
    				window.location.reload(true);
        			//$("aside").removeClass("show");
        		}
        		
        		
    		}
		});
		
		
    	
        
});
	$(document).on("click", "article#list .cards .card .detail", addData);
    $(".fixed_header #get").on("click", asideGet);
    $(document).on("click", "article#list .cards .card .tap_holder", divDetail);
	
});