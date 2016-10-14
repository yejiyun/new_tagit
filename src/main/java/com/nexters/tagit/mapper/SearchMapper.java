package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.SearchModel;
import com.nexters.tagit.model.UserSearchModel;

public interface SearchMapper {
	void insert(SearchModel search);
	SearchModel selectByContent(String content);
	List<SearchModel> selectUserSearch(String id);
	void insertUserSearch(UserSearchModel userSearch);
	void update(UserSearchModel userSearch);
	UserSearchModel selectCheckUp(UserSearchModel userSearch);

}
