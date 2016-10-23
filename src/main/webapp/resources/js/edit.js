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
	
	
});