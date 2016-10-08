package com.nexters.tagit.model;

import java.util.Date;
import java.util.List;

/**
 * item 테이블의 맵핑 모델
 * 
 * @author madplay created on 2016. 8. 21.
 */
public class ItemModel {
	private int id;
	private String url;
	private String memo;
	private Date createTime;
	private String thumbnail;
	private String content;
	private String attachMent;

	public String getAttachMent() {
		return attachMent;
	}

	public void setAttachMent(String attachMent) {
		this.attachMent = attachMent;
	}

	/* Extends */
	private List<TagModel> tagList;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<TagModel> getTagList() {
		return tagList;
	}

	public void setTagList(List<TagModel> tagList) {
		this.tagList = tagList;
	}
}