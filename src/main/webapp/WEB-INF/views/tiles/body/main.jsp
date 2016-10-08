<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/main.css">
<script type="text/javascript" src="/resources/js/main.js"></script>
<script type="x-tmpl-mustache" id="mt_tag_bundle">
<section class="tag_bundle">
	<header>
		<img src="resources/images/icon/get_memo_sharp.png"/>
		<span>{{tag_content}}</span>
	</header>
	<article class="items layout_{{layout}}">
		{{#items}}
		<div class="item" data-id="{{item_id}}" style="background-image:url({{item_thumbnail}});">
			<div class="contents"><pre>{{item_content}}</pre></div>
		</div>
		{{/items}}
	</article>
</section>
</script>
<article id="main" class="tiles">
	<div class="wrap"></div>
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
						<div class="content">강아지는 멍멍하고 짖는다. 왜냐하면 강아지이 기 때문이다. 사실
							강아지는 야옹할수 없는...</div>
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