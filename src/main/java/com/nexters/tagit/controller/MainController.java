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
import com.nexters.tagit.mapper.UserTagMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.UserModel;
import com.nexters.tagit.model.UserTagModel;


@Controller
@RequestMapping(value = "/main")
public class MainController {
	
	
}
