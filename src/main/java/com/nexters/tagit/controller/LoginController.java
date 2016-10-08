package com.nexters.tagit.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexters.tagit.mapper.UserMapper;
import com.nexters.tagit.model.UserModel;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {

	@Autowired
	UserMapper userMapper;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String loginPage(Locale locale, Model model) {
		return "login";
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public String loginProcess(@RequestBody UserModel user, HttpSession session, Locale locale, Model model) throws JsonProcessingException {	
		Map<String,Object> responseMap = new HashMap<String,Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		System.out.println("logind");
		if (user.getUser_id() != null) {
			if (userMapper.selectById(user.getUser_id()) == null) {
				userMapper.insertUser(user);
			}
			
			session.setAttribute("session", user);
			responseMap.put("state", true);
			responseMap.put("message", "성공");
			responseMap.put("action", "location.href='/';");
		} else {
			responseMap.put("state", false);
			responseMap.put("message", "실패, user_id 가 존재하지 않습니다.");
		}
		String responseJSON = objectMapper.writeValueAsString(responseMap);
		model.addAttribute("response", responseJSON);
		return "response";
	}

}
