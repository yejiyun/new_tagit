package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.ArticleModel;

public interface ArticleMapper {
	public List<ArticleModel> selectArticleListByKeyword(String keyword);
}
