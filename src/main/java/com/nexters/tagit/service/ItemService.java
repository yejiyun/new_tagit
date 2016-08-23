package com.nexters.tagit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.model.ItemModel;

/**
 * item 비즈니스 로직
 * 
 * @author madplay
 * created on 2016. 8. 21.
 */
@Service
public class ItemService {
	
	@Autowired
	private ItemMapper itemMapper;
	
	public List<ItemModel> getItemListByKeyword(String keyword) {
		return itemMapper.selectItemListByKeyword(keyword);
	}
}
