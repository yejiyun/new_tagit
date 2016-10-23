package com.nexters.tagit.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.mapper.UserTagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;
import com.nexters.tagit.model.Response;
import com.nexters.tagit.model.TagModel;
import com.nexters.tagit.model.UserModel;
import com.nexters.tagit.model.UserTagModel;
import com.nexters.tagit.service.AuthService;
import com.nexters.tagit.service.ItemService;
import com.nexters.tagit.service.SearchService;
import com.nexters.tagit.service.TagService;
import com.nexters.tagit.utils.Const;

@Controller
@RequestMapping(value = "/api")
public class ItemApiController {
	
	@Autowired AuthService authService;
	@Autowired ItemMapper itemMapper;
	@Autowired TagMapper tagMapper;
	@Autowired UserTagMapper userTagMapper;	
	
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private TagService tagService;
	@Autowired
	private SearchService searchService;
	
	@RequestMapping(value="/item/{id}/{keyword}/update", method = RequestMethod.POST)
	public ModelAndView update(@PathVariable String id,
			@RequestParam String memo,@PathVariable String keyword,HttpSession session) {
		ModelAndView mav = new ModelAndView("tiles/list");
		
		itemMapper.update(memo, Integer.parseInt(id));
		
		UserModel user = (UserModel)session.getAttribute("session");
		searchService.checkUp(keyword,user.getUser_id());
		List<ItemTag> itemTag = itemService.getItemTagByTagId(tagService.selectByContentList(keyword));
		List<ItemModel> itemList = new ArrayList<ItemModel>();
		for(ItemTag userTag : itemTag){
			ItemModel item = itemMapper.selectByMyItemId(userTag.getItem_id(),user.getUser_id());
			item.setTagList(tagMapper.selectByItemId(userTag.getItem_id()));
			itemList.add(item);
		}
		mav.addObject("itemList",itemList);		
		return mav;
	} 
	
	
	@RequestMapping(value="/item/{id}/{keyword}/del", method = RequestMethod.GET)
	public ModelAndView delete(
			@PathVariable String id,@PathVariable String keyword,HttpSession session) {
		ModelAndView mav = new ModelAndView("tiles/list");
		
		if(itemService.delete(Integer.parseInt(id))==200){
			mav.addObject("msg", "success");
		}
		else{
			mav.addObject("msg","fail");
		}
		UserModel user = (UserModel)session.getAttribute("session");
		searchService.checkUp(keyword,user.getUser_id());
		List<ItemTag> itemTag = itemService.getItemTagByTagId(tagService.selectByContentList(keyword));
		List<ItemModel> itemList = new ArrayList<ItemModel>();
		for(ItemTag userTag : itemTag){
			ItemModel item = itemMapper.selectByMyItemId(userTag.getItem_id(),user.getUser_id());
			item.setTagList(tagMapper.selectByItemId(userTag.getItem_id()));
			itemList.add(item);
		}
		mav.addObject("itemList",itemList);		
		return mav;
	} 
	
	@ResponseBody
	@RequestMapping(value = "/item/add", method = RequestMethod.POST)
	public Response addItem(ItemModel item,@RequestParam("tags") String tags,Model model,HttpServletResponse response,HttpSession session){
		response.addHeader("Access-Control-Allow-Origin", "*");
		Response res = new Response();
		if(session.getAttribute("session")!=null){
			UserModel user = (UserModel)session.getAttribute("session");
			item.setUser_id(user.getUser_id());
			itemMapper.insert(item);
			String[] tagList = tags.split(",");
			for(String tag : tagList){
				TagModel search = tagMapper.selectByContent(tag);
				if(search==null){
					TagModel tagModel = new TagModel();
					tagModel.setContent(tag);
					tagModel.setUser_id(user.getUser_id());
					tagMapper.insert(tagModel);
					UserTagModel userTag = new UserTagModel();
					userTag.setTag_id(tagModel.getId());
					userTag.setUser_id(user.getUser_id());
					userTagMapper.insert(userTag);
					ItemTag itemTag = new ItemTag();
					itemTag.setItem_id(item.getId());
					itemTag.setTag_id(tagModel.getId());
					itemMapper.insertItemTag(itemTag);
				}
				else{
					UserTagModel userTag = new UserTagModel();
					userTag.setTag_id(search.getId());
					userTag.setUser_id(user.getUser_id());
					userTagMapper.insert(userTag);
					ItemTag itemTag = new ItemTag();
					itemTag.setItem_id(item.getId());
					itemTag.setTag_id(search.getId());
					itemMapper.insertItemTag(itemTag);
				}

			}
			
			res.setState(true);
			res.setMessage("Item 삽입 하였습니다.");
			return res;
			
		}
		res.setState(false);
		res.setMessage("로그인 상태가 아닙니다.");
		return res;
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/item/{id}",method = RequestMethod.GET)
	public ItemModel getItem(@PathVariable String id,HttpSession session){
		UserModel user = (UserModel)session.getAttribute("session");
		if(user != null){
			ItemModel item = itemMapper.selectByMyItemId(Integer.parseInt(id), user.getUser_id());
			item.setTagList(tagMapper.selectByItemId(item.getId()));
			return item;
		}
		return null;
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/tag/bundle", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String mainTiles(@RequestParam("page") int page, Model model,HttpSession session, HttpServletResponse response) throws JsonProcessingException {
		UserModel user = (UserModel)session.getAttribute("session");
		if(user != null){			
			List<UserTagModel> userTagList = userTagMapper.selectByUserWithPaging(user.getUser_id(), page * Const.rowForPage, Const.rowForPage);
			ObjectMapper objectMapper = new ObjectMapper();
			List<ItemModel> itemList = new ArrayList<ItemModel>();
			List<HashMap<String, Object>> tagBundles = new ArrayList<>();
			HashMap<String, Object> responseMap = new HashMap<String, Object>();
			
			if(userTagList == null || userTagList.size() <= 0) {
				responseMap.put("state", false);
				responseMap.put("message", "데이터가 없습니다.");
			} else {
				responseMap.put("state", true);
				responseMap.put("message", "성공");
				
				for(UserTagModel userTag : userTagList){
					HashMap<String, Object> tag = new HashMap<>();
					tag.put("name", tagMapper.selectContent(userTag.getTag_id()));
					tag.put("list", itemMapper.selectByItemTag(userTag.getTag_id()));
					tagBundles.add(tag);
				}
				
				responseMap.put("data", tagBundles);
			}
			
			return objectMapper.writeValueAsString(responseMap);
		}
		return "";
	}
	
}
