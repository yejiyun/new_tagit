package com.nexters.tagit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexters.tagit.mapper.TagMapper;
import com.nexters.tagit.model.TagModel;


@Service
public class TagService {

	@Autowired
	private TagMapper tagMapper;
	
	public List<TagModel> getTagListByItemId(Integer itemId) {
		return tagMapper.selectTagListByItemId(itemId);
	}
	public List<TagModel> selectByContentList(String rawKeyword){
		String[] keywordArr = rawKeyword.split(",");
		List<TagModel> tm = new ArrayList<TagModel>();
		
		for(String temp : keywordArr){
			tm.add(tagMapper.selectByContent(temp));
		}
		
		
		return tm;
	
		
	}
	public int updateTagEditTime(List<TagModel> tagList) {
		Iterator<TagModel> it = tagList.iterator();
		String tagIdList = "";
		int listSize = tagList.size();
		
		for(int loopCount = 0; loopCount < listSize; loopCount++) {
			TagModel tagModel = it.next();
			
			if(loopCount < listSize - 1) {
				tagIdList += ",";
			}
			tagIdList += Integer.toString(tagModel.getId());
		}
			
		return tagMapper.updateTagEditTime(tagIdList);
	}
	
	public List<TagModel> getLatestTagList() {
		return tagMapper.selectLatestTagList();
	}
}
