/**
 * 상단 검색 버튼 스크립트
 * 
 * @author madplay created on 2016. 8. 21.
 */
var search = {
	init : function() {
		this._searchBtn = $('#search');
		this._header = $('#header');
		/* 페이지 완료 후 키워드 처리 필요 */
		this._attachEvents();
	},

	_attachEvents : function() {
		$(document).on('click', '#search', $.proxy(this._search, this));
		$(document).on('keyup', 'span.input', $.proxy(this._search, this));
	},

	_isOpendHeader : function() {
		if (this._header.hasClass('open'))
			return true;
		else
			return false;
	},

	_search : function(e) {
		switch (e.which) {
		case 1:
		case 13:
			if (this._isOpendHeader()) {
				var _keywordList = this._header.find('span.label');
				var _keyword = "";
				var _keywordLength = _keywordList.length;
				if (_keywordLength > 0) {
					_keywordList.each(function(idx, el) {
						_keyword = _keyword + el.innerText;
						if (_keywordLength - 1 > idx) {
							_keyword = _keyword + ","
						}
					});

					$(location).attr('href', '/search/' + _keyword);
				}
			} else {
				this._openSearchField();
			}
			break;
		}
	},

	_openSearchField : function() {
		this._header.attr('class', 'open');
	}
}

search.init();