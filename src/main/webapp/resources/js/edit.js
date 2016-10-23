$(function(){
	$('.detail').click(function(){
		var id = $('#id').val();
		var item;
		$.ajax({
    		url: "/api/item/"+id,
    		method :"GET",
    		success : function(response) {
    			if(response!=null){
    				item = response.data;
    				addData(item);
    			}
    		}
		});
		
		
		
		
		
	});
	
	$('.btn_close').click(function(){
		$('#detail_edit').removeClass('show');
	})
	
	var addData = function(item){

		var tag = item.tagList.map( function(it){return it.content;});
		$('#detail_edit div.article div.content').text(item.content);
		$('.txt_memo').text(item.memo);
		$('#detail_edit div.thumbnail div.image').css('background-image','url('+item.thumbnail+')');
		$('#detail_edit div.tags input.txt_tags').tokenizer();
		$('#detail_edit div.tags input.txt_tags').attr("value", tag.join(","));
		$('#detail_edit').addClass('show');
	}
});