package com.nexters.tagit.model;

import java.util.Date;
import java.util.List;

/**
 * item 테이블의 맵핑 모델
 * 
 * @author madplay
 * created on 2016. 8. 21.
 */
public class ItemModel {
	private Integer id;
	private String url;
	private String title;
	private Date createTime;
	private String thumbnail;
	private String content;

	/* Extends */
	private List<TagModel> tagList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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