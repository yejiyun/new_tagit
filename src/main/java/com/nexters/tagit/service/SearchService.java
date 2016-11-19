package com.nexters.tagit.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexters.tagit.mapper.SearchMapper;
import com.nexters.tagit.model.SearchModel;
import com.nexters.tagit.model.UserSearchModel;

@Service
public class SearchService {
	
	@Autowired SearchMapper searchMapper;
	
	public void checkUp(String keyword,String userId){
		String[] list = keyword.split(",");
		List<SearchModel> newList = new ArrayList<SearchModel>();
		for(String s : list){
			SearchModel sm = searchMapper.selectByContent(s);
			UserSearchModel us = new UserSearchModel();
			
			if(sm==null){
				sm = new SearchModel();
				sm.setContent(s);
				searchMapper.insert(sm);
			}
			us.setSearchId(sm.getId());
			us.setUserId(userId);
			if(searchMapper.selectCheckUp(us)==null){
				searchMapper.insertUserSearch(us);
			}
			
		}
	}

}
