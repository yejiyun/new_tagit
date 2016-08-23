package com.nexters.tagit.utils;

/**
 * 쿼리 관련 유틸
 * static으로 추가하고 param까지 코멘트 명시 요망
 * 
 * @author madplay
 * created on 2016. 8. 21.
 */
public class QueryUtils {
	
	/**
	 * 입력받은 쿼리 키워드를 Multi-Like
	 * 키워드로 반환한다.
	 * 
	 * @author madplay
	 * created on 2016. 8. 21.
	 * @param rawKeyword 정제하기 전 사용자의 입력 키워드
	 */
	public static String makeMultiLikeQuery(String rawKeyword) {

		String[] keywordArr = rawKeyword.split(",");

		String keywordForQuery = "%" + keywordArr[0] + "%";

		if (keywordArr.length > 1) {
			for (String keywordSegment : keywordArr) {
				keywordForQuery += " OR title LIKE \"%" + keywordSegment + "%\"";
			}
		}
		return keywordForQuery;
	}
}
