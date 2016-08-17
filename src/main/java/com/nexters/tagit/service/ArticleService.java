package com.nexters.tagit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexters.tagit.mapper.ArticleMapper;
import com.nexters.tagit.model.ArticleModel;

@Service
public class ArticleService {
	
	@Autowired
	private ArticleMapper articleMapper;
	
	public List<ArticleModel> getArticleListBySearch(String keyword) {
		return articleMapper.selectArticleListByKeyword(keyword);
	}
}
