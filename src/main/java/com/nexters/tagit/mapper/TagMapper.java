package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.TagModel;

public interface TagMapper {
	public List<TagModel> selectTagListByItemId(Integer itemId);
	
	public int updateTagEditTime(String tagIdList);
	List<TagModel> selectByItemId(int item_id);
	public List<TagModel> selectLatestTagList();
	List<TagModel> selectTagInit(String user_id);
	void insert(TagModel tag);
	TagModel selectByContent(String content);
	String selectContent(int id);
}