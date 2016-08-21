package com.nexters.tagit.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping(value = "/login", method = RequestMethod.GET)
public class LoginController {	
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String loginPage(Locale locale, Model model) {		
		return "login";
	}
}
