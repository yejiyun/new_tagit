<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"
%><%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<link rel="stylesheet" href="/resources/css/nav.css">
<link rel="stylesheet" href="/resources/css/lib/bootstrap.css">
<link rel="stylesheet" href="/resources/css/lib/bootstrap-tokenizer.css">
<script src="/resources/js/bootstrap-tokenizer.js"></script>

<div class = "swiper-container">
	<div class = "swiper-wrapper">
	<c:forEach var="search" items="${recentSearch}" varStatus="loop"> 
        <div class = "swiper-slide">#${search.content}</div>
       
    </c:forEach>
    </div>
</div>