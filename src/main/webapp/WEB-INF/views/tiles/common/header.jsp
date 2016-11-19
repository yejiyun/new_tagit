<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- <div class="fixed_header">
	<img id="get" src="/resources/images/icon/get.png"> 
	<img id="top_logo" src="/resources/images/icon/top_logo.png"> 
	<input type="button" id="search" src="/resources/images/icon/search.png">
</div> -->

<div class="fixed_header">
	<img id="get" src="/resources/images/icon/get.png"> <a href="/"><img
		id="top_logo" src="/resources/images/icon/top_logo.png"></a> <input
		class="span4" type="text" data-provide="tokenizer" value=""> <img
		id="search" src="/resources/images/icon/search.png">
		
		
</div>
<script>
	$(document).ready(function(){
		
		$("#search").click(function(){
			if($("#header").hasClass("open")){
				location.href = "/search/"+$(".span4").val();
			}
			$("#header").toggleClass("open");
			
		});
	});

</script>