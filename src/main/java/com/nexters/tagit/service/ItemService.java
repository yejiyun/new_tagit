package com.nexters.tagit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;
import com.nexters.tagit.model.TagModel;

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
	
	public List<ItemTag> getItemTagByTagId(List<TagModel> list){
		List<Integer> idList = new ArrayList<Integer>();
	
		for(TagModel tm : list){	
		  idList.add(tm.getId());
		}
		
		return itemMapper.selectByItemTagId(idList);
	}
	
	public List<ItemModel> getItemListByKeyword(String keyword) {
		return itemMapper.selectItemListByKeyword(keyword);
	}
}
