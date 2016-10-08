package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.ItemModel;

public interface ItemMapper {
	List<ItemModel> selectItemListByKeyword(String keyword);
	void insert(ItemModel itemModel);
	ItemModel selectByTagId(int tag_id);
	List<ItemModel> selectByCount(int count);
	
}