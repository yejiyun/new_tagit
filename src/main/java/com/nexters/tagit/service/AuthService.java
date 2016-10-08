package com.nexters.tagit.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexters.tagit.model.UserModel;

/**
 * @author KimJava
 * 
 */

@Service
public class AuthService {
	
	public static boolean authCheck(String id,Object obj){
		if((obj instanceof UserModel) == false) return false;
		UserModel user = (UserModel)obj;
		return(user.getUser_id() == null ? id == null : user.getUser_id().equals(id));
	}
}
