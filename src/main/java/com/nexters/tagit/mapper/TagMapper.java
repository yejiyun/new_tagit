package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.TagModel;

public interface TagMapper {
	public List<TagModel> selectTagListByItemId(Integer itemId);
	
	public int updateTagEditTime(String tagIdList);
	
	public List<TagModel> selectLatestTagList();
}