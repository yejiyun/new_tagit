package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;

public interface ItemMapper {
	List<ItemModel> selectItemListByKeyword(String keyword);
	void insert(ItemModel itemModel);
	ItemModel selectByTagId(int tag_id);
	ItemModel selectByItemId(int id);
	List<ItemModel> selectByCount(int count);
	ItemModel selectByItemTag(int tag_id);
	void insertItemTag(ItemTag itemTag);
	List<ItemTag> selectByItemTagId(List<Integer> list);
}