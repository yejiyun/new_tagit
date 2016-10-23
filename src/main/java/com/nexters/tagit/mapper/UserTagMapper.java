package com.nexters.tagit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.nexters.tagit.model.UserTagModel;

public interface UserTagMapper {
	void insert(UserTagModel userTag);
	List<UserTagModel> selectByInit();
	List<UserTagModel> selectById(UserTagModel userTagModel);
	List<UserTagModel> selectByUserWithPaging(@Param("user_id") String user_id, @Param("index") int index, @Param("rfp") int rfp);
}
