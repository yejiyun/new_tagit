package com.nexters.tagit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;
import com.nexters.tagit.model.TagModel;

public interface ItemMapper {
	List<ItemModel> selectItemListByKeyword(String keyword);
	void insert(ItemModel itemModel);
	ItemModel selectByTagId(int tag_id);
	ItemModel selectByItemId(int id);
	ItemModel selectByMyItemId(@Param("id") int id,@Param("user_id") String user_id);
	ItemModel selectById(@Param("id") int id, @Param("user_id") String user_id);
	List<ItemModel> selectByCount(int count);
	List<ItemModel> selectByItemTag(int tag_id);
	void insertItemTag(ItemTag itemTag);
	List<ItemTag> selectByItemTagId(List<Integer> list);
	void delete(int id);
	void deleteItemTag(int id);
	void update(ItemModel item);
}