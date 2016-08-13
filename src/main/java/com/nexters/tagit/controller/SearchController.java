package com.nexters.tagit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.nexters.tagit.model.ArticleModel;
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
	public ModelAndView search(
			@RequestParam(required = false, defaultValue = "") String keyword) {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> msg = new HashMap<String, Object>();
		
		List<ArticleModel> resultList = articleService.getArticleListBySearch(keyword);
		msg.put("list", resultList);
		mav.addObject("result", msg);
		
		return mav;
	}
}
