<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"
%><%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<link rel="stylesheet" href="/resources/css/main.css">
<script type="text/javascript" src="/resources/js/main.js"></script>
<script type="x-tmpl-mustache" id="mt_tag_bundle">
<section class="tag_bundle">
	<header>
		<img src="resources/images/icon/get_memo_sharp.png"/>
		<span>{{tagName}}</span>
	</header>
	<article class="items layout_{{layout}}">
		{{#items}}
		<div class="item" data-id="{{id}}" style="background-image:url({{thumbnail}});">
			<div class="contents"><pre>{{content}}</pre></div>
		</div>
		{{/items}}
	</article>
</section>
</script>
<article id="main" class="tiles">	
	<div class="wrap">
		<c:forEach var="tag" items="${tagBundles}" varStatus="loop"> 
		<section class="tag_bundle">
			<header>
				<img src="resources/images/icon/get_memo_sharp.png"/>
			
		           <a>${tag.get('name')}</a>
		        
			</header>
			<c:set var="size" value="${tag.get('list').size()}" />
			<c:choose>
			    <c:when test="${size < 2}">
			        <c:set var="size" value="01" />
			    </c:when>
			    <c:when test="${size < 3}">
			        <c:set var="size" value="02" />
			    </c:when>
			    <c:when test="${size < 4}">
			        <c:set var="size" value="03" />
			    </c:when>
			    <c:otherwise>
			        <c:set var="size" value="04" />
			    </c:otherwise>
			</c:choose>
			<article class="items layout_${size}">
				<c:forEach var="item" items="${tag.get('list')}" varStatus="loop"> 
					<div class="item" data-id="${item.id}" style="background-image:url(${item.thumbnail});">
						<div class="contents"><pre>${item.content}</pre></div>
					</div>
				</c:forEach>
			</article>
	     </section>
	     </c:forEach>
	</div>
	<div class="more">불러오는중...</div>
	<div class="card_detail">
		<div class="header">
			<div class="wrap">
				<div class="btn_back">
					<img src="resources/images/icon/arrow_left.png">
				</div>
				<div class="page">1/8</div>
			</div>
		</div>
		<div class="article ">
			<div class="image">
				<img src="resources/images/sample/long_cat.jpg">
			</div>
			<div class="content">
				<div class="wrap">
					<div class="wrap"></div>
				</div>
			</div>
		</div>
	</div>
</article>
<aside id="get">
	<div class="wrap">
		<div class="header">
			<img class="btn_close" src="/resources/images/icon/x.png">
		</div>
		<div class="article">
			<div class="thumbnail">
				<div class="prev"></div>
				<div class="image"
					style="background-image: url(/resources/images/sample/cat_01.png);">
					<div class="wrap">
						<div class="content"></div>
					</div>
				</div>
				<div class="next"></div>
			</div>
			<div class="tags">
				<div class="head">
					<img src="/resources/images/icon/get_memo_sharp.png">
				</div>
				<div class="body">
					<input class="txt_tags" type="text" placeholder="태그를 입력하세요."
						data-provide="tokenizer" value="">
				</div>
			</div>
			<div class="memo">
				<div class="head">
					<img src="/resources/images/icon/memo.png">
				</div>
				<div class="body">
					<textarea class="txt_memo" placeholder="메모를 입력하세요."
						onKeyPress="javascript: if (event.keyCode==13) return false;"
						maxlength="60"></textarea>
				</div>
			</div>
		</div>
		<div class="footer">
			<img class="btn_apply" src="/resources/images/icon/check.png">
		</div>
	</div>
</aside>