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
import com.nexters.tagit.service.TagService;


@Controller
@RequestMapping(value = "/api")
public class TagApiController {
	@Autowired
	private TagService tagService;
	
	@RequestMapping(value = "/latestTagList")
	@ResponseBody
	public List<TagModel> getLatestTagList() {

		List<TagModel> latestTagModel = tagService.getLatestTagList();
		return latestTagModel;
	}
	
}
