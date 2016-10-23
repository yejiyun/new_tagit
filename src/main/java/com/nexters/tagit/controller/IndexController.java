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

import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.mapper.SearchMapper;
import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.mapper.UserTagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;
import com.nexters.tagit.model.UserModel;
import com.nexters.tagit.model.UserTagModel;
import com.nexters.tagit.service.ItemService;
import com.nexters.tagit.service.TagService;

@Controller
public class IndexController {
	

	@Autowired
	private ItemService itemService;
	@Autowired
	private TagService tagService;
	
	@Autowired
	private TagMapper tagMapper;	
	@Autowired
	private ItemMapper itemMapper;	
	@Autowired
	private UserTagMapper userTagMapper;
	@Autowired
	private SearchMapper searchMapper;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String mainTiles(Locale locale, Model model,HttpSession session) {
		UserModel user = (UserModel)session.getAttribute("session");
		if(user != null){
			List<UserTagModel> userTagList = userTagMapper.selectByUserWithPaging(user.getUser_id(), 0, 4);
			List<ItemModel> itemList = new ArrayList<ItemModel>();
			List<HashMap<String, Object>> tagBundles = new ArrayList<>();
			
			if(userTagList == null)			
				return "tiles/main";
			
			for(UserTagModel userTag : userTagList){
				HashMap<String, Object> tag = new HashMap<>();
				tag.put("name", tagMapper.selectContent(userTag.getTag_id()));
				tag.put("list", itemMapper.selectByItemTag(userTag.getTag_id()));
				tagBundles.add(tag);
			}
			model.addAttribute("recentSearch", searchMapper.selectUserSearch(user.getUser_id()));
			model.addAttribute("tagBundles", tagBundles);
		}
		return "tiles/main";
	}
	
	@RequestMapping(value="/{tags}",method = RequestMethod.POST)
	public String getItem(@PathVariable String tags,Model model,HttpSession session,HttpServletResponse response) {
		if(session.getAttribute("session")!=null){
			if(tags == null) {
				List<ItemModel> itemList = itemMapper.selectByCount(6);
				for(ItemModel item : itemList){
					item.setTagList(tagMapper.selectByItemId(item.getId()));					
				}
				model.addAttribute("itemList",itemList);
			} else {
				List<ItemTag> itemTag = itemService.getItemTagByTagId(tagService.selectByContentList(tags));
				List<ItemModel> itemList = new ArrayList<ItemModel>();
				for(ItemTag userTag : itemTag){
					ItemModel item = itemMapper.selectByItemId(userTag.getItem_id());
					item.setTagList(tagMapper.selectByItemId(userTag.getItem_id()));
					itemList.add(item);
				}
				model.addAttribute("itemList",itemList);
			}
		}
		return "tiles/list";
	}
}
