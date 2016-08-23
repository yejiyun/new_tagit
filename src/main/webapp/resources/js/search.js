/**
 * 상단 검색 버튼 스크립트
 * 
 * @author madplay
 * created on 2016. 8. 21.
 */
var search = {
	
	init : function() {
		this._searchBtn = $('#search');
		this._header = $('#header');
		/* 페이지 완료 후 키워드 처리 필요  */
		this._attachEvents();
	},
	
	_attachEvents : function() {
		this._searchBtn.on('click', $.proxy(this._search, this));
	}, 
	
	_isOpendHeader : function() {
		if(this._header.hasClass('open')) return true;
		else return false;
	},
	
	_search : function() {
		if(this._isOpendHeader()) {
			var _keywordList = $('.label');
			var _keyword = "";
			var _keywordLength = _keywordList.length;
			_keywordList.each(function(idx, el) {
				_keyword = _keyword + el.innerText;
				if(_keywordLength-1 > idx) {
					_keyword = _keyword + ","
				}
			});
			
			$(location).attr('href', '/search?keyword='+_keyword);
			
		} else {
			this._openSearchField();
		}
	},
	
	_openSearchField : function() {
		this._header.attr('class', 'open');
		
		$.ajax('/latestTagList.json', {
			dataType : 'json',
			contentType: 'application/json; charset=UTF-8',
			context : this,
			
			success : function(result) {
				$.each(result, function(idx, tag) {
					$('<div></div>').addClass("swiper-slide")
					.html('#'+tag.content).appendTo('.swiper-wrapper');
				})
				
				var mySwiper = new Swiper('.swiper-container', {
		            slidesPerView: 4,
		            spaceBetween: 7
		        });
			}
		});
	}
}