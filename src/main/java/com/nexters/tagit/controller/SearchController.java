package com.nexters.tagit.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nexters.tagit.service.ArticleService;

/**
 * 상단 검색 기능 관련 컨트롤러
 * 
 * @author madplay
 * @since 2016.08.13
 */
@Controller
public class SearchController {
	
	@Autowired
	private ArticleService articleService;
	
	@RequestMapping(value ="/search")
	@ResponseBody
	public Map<String, Object> search(
			@RequestParam(required = false, defaultValue = "") String keyword) {
		
		Map<String, Object> msg = new HashMap<String, Object>();
		msg.put("list", articleService.getArticleListBySearch(keyword));
		
		return msg;
	}
}
