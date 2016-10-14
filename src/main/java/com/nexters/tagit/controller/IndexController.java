package com.nexters.tagit.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.mapper.SearchMapper;
import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.mapper.UserTagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.UserModel;
import com.nexters.tagit.model.UserTagModel;

@Controller
public class IndexController {
	
	
	@Autowired TagMapper tagMapper;
	@Autowired ItemMapper itemMapper;
	@Autowired UserTagMapper userTagMapper;
	@Autowired SearchMapper searchMapper;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String mainTiles(Locale locale, Model model,HttpSession session) {
		UserModel user = (UserModel)session.getAttribute("session");
		if(user!=null){
			List<UserTagModel> userTagList = userTagMapper.selectByInit();
			List<ItemModel> itemList = new ArrayList<ItemModel>();
			if(userTagList==null){
				
				return "tiles/main";
			}
			for(UserTagModel userTag : userTagList){
				ItemModel item = itemMapper.selectByItemTag(userTag.getTag_id());
				item.setTagName(tagMapper.selectContent(userTag.getTag_id()));
				itemList.add(item);
			}
			model.addAttribute("recentSearch", searchMapper.selectUserSearch(user.getUser_id()));
			model.addAttribute("itemList",itemList);
			
			return "tiles/main";
		}
		return "tiles/main";

	}
	
	
}
