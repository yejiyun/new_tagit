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
		
		this._attachEvents();
	},
	
	_attachEvents : function() {
		$.ajax({
			url : '/search',
			dataType : 'json',
			data : {
				keyword : this._keyword
			},
			
			success : function(result) {
				/* 검색 이후 동작 */
			}
		});
	}
}