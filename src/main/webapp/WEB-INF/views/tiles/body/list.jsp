<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"
%><%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<link rel="stylesheet" href="/resources/css/list.css">
<script type="text/javascript" src="/resources/js/edit.js"></script>
<input id="keyword" type="hidden" value="${keyword}"/>
<article id="list" class="tiles">
    <section class="cards layout_02">
    	<c:forEach var="item" items="${itemList}" varStatus="loop">
        <div class="card" style="background-image:url(${item.thumbnail});" data-id="${item.id}">
            <div class="wrap delete">
                <div class="center">
                    <div class="trash"><img src="/resources/images/icon/trash.png"></div>
                    <div class="btn_delete">삭제하기</div>
                </div>
            </div>
            <div class="detail"></div>
            <div class="wrap">
                <div class="tap_holder"></div>
                <div class="video"></div>
                <div class="bottom">
                    <div class="contents">${item.memo}</div>
                    <div class="tags">
                    	<c:forEach var="eachTag" items="${item.tagList}" varStatus="tagLoop">
                        <span class="tag">#${eachTag.content}</span>
                        </c:forEach>
                    </div>
                </div>
            </div>
        </div>
    	</c:forEach>
    </section>
	<div class="card_detail">
		<div class="header">
			<div class="wrap">
				<div class="btn_back">
					<img src="/resources/images/icon/arrow_left.png">
				</div>
				<div class="page">1/8</div>
			</div>
		</div>
		<div class="article ">
			<div class="image">
				<img src="/resources/images/sample/long_cat.jpg">
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
<aside id="detail_edit">
    <div class="wrap">
        <div class="header">
            <img class="btn_close" src="/resources/images/icon/x.png">
        </div>
        <div class="article">
            <div class="thumbnail">
                <div class="image" style="background-image:url(/resources/images/sample/cat_01.png);">
                    <div class="wrap">
                        <div class="content">강아지는 멍멍하고 짖는다. 왜냐하면 강아지이 기 때문이다. 사실 강아지는 야옹 멍할수 없는...</div>
                    </div>
                </div>
            </div>
            <div class="tags">
                <div class="head">
                    <img src="/resources/images/icon/get_memo_sharp.png">
                </div>
                <div class="body">
                	<input class="txt_tags" type="text" placeholder = "태그를 입력하세요." data-provide="tokenizer" value=""> 
                </div>
            </div>
            <div class="memo">
                <div class="head">
                    <img src="/resources/images/icon/memo.png">
                </div>
                <div class="body">
                    <textarea class="txt_memo" placeholder="메모를 입력하세요."
                              onKeyPress="javascript: if (event.keyCode==13) return false;" maxlength="60"></textarea>
                </div>
            </div>
        </div>
        <div class="footer">
            <img class="btn_apply" src="/resources/images/icon/check.png">
        </div>
    </div>
</aside>