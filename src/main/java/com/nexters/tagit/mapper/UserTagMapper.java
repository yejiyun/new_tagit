package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.UserTagModel;

public interface UserTagMapper {
	void insert(UserTagModel userTag);
	List<UserTagModel> selectByInit();
}
