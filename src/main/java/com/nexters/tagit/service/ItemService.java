package com.nexters.tagit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.nexters.tagit.mapper.ItemMapper;
import com.nexters.tagit.model.ItemModel;
import com.nexters.tagit.model.ItemTag;
import com.nexters.tagit.model.TagModel;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
public class ItemService {
	
	@Autowired
	private ItemMapper itemMapper;
	
	public List<ItemTag> getItemTagByTagId(List<TagModel> list){
		List<Integer> idList = new ArrayList<Integer>();
	
		for(TagModel tm : list){	
		  idList.add(tm.getId());
		}
		System.out.println(idList.toString());
		return itemMapper.selectByItemTagId(idList);
	}
	
	@Transactional
	public int delete(int id){
			try{
				itemMapper.delete(id);
				itemMapper.deleteItemTag(id);
				
	        return 200;
	    } catch(Exception e) {
	    		e.printStackTrace();
	            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	            return 500;
	    }
	        
    }
	
	
	public List<ItemModel> getItemListByKeyword(String keyword) {
		return itemMapper.selectItemListByKeyword(keyword);
	}
}
