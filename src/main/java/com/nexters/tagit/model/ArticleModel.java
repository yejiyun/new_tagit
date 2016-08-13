package com.nexters.tagit.model;

import java.util.Date;

/**
 * article 테이블의 맵핑 모델
 * @author madplay
 * @since 2016.08.13
 *
 */
public class ArticleModel {
	private Integer articleNum;
	private String articleUrl;
	private String articleTitle;
	private Date createTime;
	private String thumbnail;
	
	public Integer getArticleNum() {
		return articleNum;
	}
	public void setArticleNum(Integer articleNum) {
		this.articleNum = articleNum;
	}
	public String getArticleUrl() {
		return articleUrl;
	}
	public void setArticleUrl(String articleUrl) {
		this.articleUrl = articleUrl;
	}
	public String getArticleTitle() {
		return articleTitle;
	}
	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
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
}
