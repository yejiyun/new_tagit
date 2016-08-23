package com.nexters.tagit.controller;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.TagModel;
import com.nexters.tagit.service.ItemService;
import com.nexters.tagit.service.TagService;
import com.nexters.tagit.utils.QueryUtils;

/**
 * 상단 검색창 관련 컨트롤러
 * 
 * @author madplay
 * created on 2016. 8. 21.
 */
@Controller
public class SearchController {
	
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private TagService tagService;
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ModelAndView search(
			@RequestParam(required = false) String keyword) {
		ModelAndView mav = new ModelAndView("tiles/list");
		
		String keywordForQuery = QueryUtils.makeMultiLikeQuery(keyword);
		
		List<ItemModel> searchList = itemService.getItemListByKeyword(keywordForQuery);
		Iterator<ItemModel> it = searchList.iterator();
		
		while(it.hasNext()) {
			ItemModel item = it.next();
			List<TagModel> tagList = tagService.getTagListByItemId(item.getId());
			tagService.updateTagEditTime(tagList);
			item.setTagList(tagList);
			
		}
		mav.addObject("result", searchList);
		
		return mav;
	}
	
	@RequestMapping(value = "/latestTagList")
	@ResponseBody
	public List<TagModel> getLatestTagList() {

		List<TagModel> latestTagModel = tagService.getLatestTagList();
		return latestTagModel;
	}
}