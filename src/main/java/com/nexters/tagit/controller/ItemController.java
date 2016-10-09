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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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


@Controller
@RequestMapping(value = "/item")
public class ItemController {
	
	@Autowired AuthService authService;
	@Autowired ItemMapper itemMapper;
	@Autowired TagMapper tagMapper;
	@Autowired UserTagMapper userTagMapper;
	
	
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
	
}
