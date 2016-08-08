<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>tagit</title>
<link href="http://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css" rel="stylesheet" media="screen">
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/tagit/resources/js/facebook/logout.js"></script>
<script type="text/javascript"
	src="http:////connect.facebook.net/en_US/sdk.js"></script>
<script>
$(function(){
	
	FB.init({
		appId : '1662043397451420',
		cookie : true,
		xfbml : true,
		version : 'v2.7'
	});
	$("#logout").click(function(){
		ckFB();
	});
})
</script>
<!--  <script type="text/javascript" src="http://localhost:8000/tagit/resources/js/facebook/login.js"></script>-->
  <!-- 페이스북에서 유저 정보 및 타임라인을 가져오는 스크립트 -->
 <!-- <script type="text/javascript" src="http://localhost:8000/tagit/resources/js/facebook/userInfo.js"></script>
  <link rel="stylesheet" type="text/css" href="http://localhost:8000/tagit/resources/css/facebook.css"> -->