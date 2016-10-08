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
import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.TagModel;
import com.nexters.tagit.model.UserModel;

@Controller
public class IndexController {
	
	
	@Autowired TagMapper tagMapper;
	@Autowired ItemMapper itemMapper;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String mainTiles(Locale locale, Model model,HttpSession session) {
		UserModel user = (UserModel)session.getAttribute("sesssion");
		if(user!=null){
			List<TagModel> tagList = tagMapper.selectTagInit(user.getUser_id());
			List<ItemModel> itemList = new ArrayList<ItemModel>();
			if(tagList==null){
				return "tiles/main";
			}
			for(int i=0;i<tagList.size();i++){
				itemList.add(itemMapper.selectByTagId(tagList.get(i).getId()));
			}
			
			
			model.addAttribute("itemList",itemList);
			return "tiles/main";
		}
		
		return "tiles/main";
	}
	
}
