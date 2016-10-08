package com.nexters.tagit.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.Response;
import com.nexters.tagit.service.AuthService;


@Controller
@RequestMapping(value = "/item")
public class ItemController {
	
	@Autowired AuthService authService;
	@Autowired ItemMapper itemMapper;
	@Autowired TagMapper tagMapper;
	
	
	@RequestMapping(value="/api/list/{count}",method = RequestMethod.GET)
	public String getItem(@PathVariable String count,Model model,HttpSession session,HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		if(session.getAttribute("session")!=null){
			List<ItemModel> itemList = itemMapper.selectByCount(Integer.parseInt(count));
			for(ItemModel item : itemList){
				item.setTagList(tagMapper.selectByItemId(item.getId()));
			}
			model.addAttribute("itemList",itemList);
		}
		return "tiles/list";
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/add", method = RequestMethod.POST)
	public Response addItem(ItemModel item,String[] tags,Model model,HttpServletResponse response,HttpSession session){
		response.addHeader("Access-Control-Allow-Origin", "*");
		Response res = new Response();
		if(session.getAttribute("session")!=null){
			for(String s:tags){
				System.out.println(s);
			}
			System.out.println(item.getUrl());
			System.out.println(item.getThumbnail());
			/*
			itemMapper.insert(item);
			res.setState(true);
			res.setMessage("Item 삽입 성공");
			return res;
			*/
		}
		res.setState(false);
		res.setMessage("로그인 상태 아님");
		return res;
		
	}
	
}
