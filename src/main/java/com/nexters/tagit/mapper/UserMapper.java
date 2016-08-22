package com.nexters.tagit.mapper;

import com.nexters.tagit.model.UserModel;

public interface UserMapper {
	UserModel selectById(String user_id);
	void insertUser(UserModel user);
}
