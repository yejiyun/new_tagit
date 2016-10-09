package com.nexters.tagit.model;

/**
 * tag 테이블의 맵핑 모델
 * 
 * @author madplay created on 2016. 8. 21.
 */
public class TagModel {
	private int id;
	private String content;
	private String createTime;
	private String editTime;
	private String user_id;



	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getEditTime() {
		return editTime;
	}

	public void setEditTime(String editTime) {
		this.editTime = editTime;
	}

}
