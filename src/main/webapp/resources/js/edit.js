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
        $(this).removeClass("show");
    });
    
	$(window).load(function() {
    	// Pre-parsing and Caching Templates
        window._global = {
        	page: 0,
	        modules: {
	            aside: new Modules($("aside#detail_edit")),
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
    		        var aside = _global.modules.aside.init();
    		        
    		        aside.find(".header .btn_close").click(function() {
    		            aside.animate({
    		                opacity: 0
    		            }, 300, function() {
    		                aside.remove();
    		            });
    		        });
    		        
    		        aside.find(".article").attr("data-id", data.id);
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
	
	$(document).on("click", "article#list .cards .card .detail", addData);

    $(document).on("click", "article#list .cards .card .tap_holder", divDetail);
	
});