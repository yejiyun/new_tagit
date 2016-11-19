package com.nexters.tagit.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;
import com.nexters.tagit.model.TagModel;
import com.nexters.tagit.model.UserModel;
import com.nexters.tagit.service.ItemService;
import com.nexters.tagit.service.SearchService;
import com.nexters.tagit.service.TagService;


@Controller
@RequestMapping("/search")
public class SearchController {
	
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private TagService tagService;
	@Autowired
	private SearchService searchService;
	
	@Autowired TagMapper tagMapper;
	@Autowired ItemMapper itemMapper;
	
	@RequestMapping(value = "/{keyword}", method = RequestMethod.GET)
	public ModelAndView search(
			@PathVariable String keyword,HttpSession session) throws JsonProcessingException {
		UserModel user = (UserModel)session.getAttribute("session");
		if(user==null){
			ModelAndView mav = new ModelAndView("login");
			return mav;
		}
		
		ModelAndView mav = new ModelAndView("tiles/list");
		ObjectMapper objectMapper = new ObjectMapper();
		System.out.println(keyword);
		searchService.checkUp(keyword,user.getUser_id());
		List<TagModel> tm = tagService.selectByContentList(keyword);
		if(tm.get(0)==null){
			return mav;
		}
		List<ItemTag> itemTag = itemService.getItemTagByTagId(tm);
		List<ItemModel> itemList = new ArrayList<ItemModel>();
		for(ItemTag userTag : itemTag){
			ItemModel item = itemMapper.selectByMyItemId(userTag.getItem_id(),user.getUser_id());
			if(item!=null){
				item.setTagList(tagMapper.selectByItemId(userTag.getItem_id()));
			}
			itemList.add(item);
			
		}
		mav.addObject("itemList",itemList);
		mav.addObject("keyword",keyword);
		return mav;
	}
	
	@RequestMapping(value = "/latestTagList")
	@ResponseBody
	public List<TagModel> getLatestTagList() {

		List<TagModel> latestTagModel = tagService.getLatestTagList();
		return latestTagModel;
	}
}