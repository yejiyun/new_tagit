/**
 * 검색 버튼 동작 스크립트
 * 
 * @author Kimtaeng
 * @since 2016.08.13
 * 
 */
var search = {
	
	init : function() {
		this._searchBtn = $('#search');
		this._keyword = $('#tags');
		/* 페이지 완료 후 키워드 처리 필요  */
		this._attachEvents();
	},
	
	_attachEvents : function() {
		this._searchBtn.on('click', $.proxy(this._search, this));
	}, 
	
	_search : function() {
		$.ajax('/search.json', {
			dataType : 'json',
			contentType: 'application/json; charset=UTF-8',
			data : {
				keyword : this._keyword
			},
			
			success : function(result) {
				/* 페이지 완료 후 처리 예정 */
			}, 
		});
	}
}