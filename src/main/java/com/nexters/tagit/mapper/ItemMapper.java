package com.nexters.tagit.mapper;

import java.util.List;

import com.nexters.tagit.model.ItemModel;

public interface ItemMapper {
	public List<ItemModel> selectItemListByKeyword(String keyword);
}