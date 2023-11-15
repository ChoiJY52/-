package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="comments")
public class Comment {
	@Id
	private String commentId;
	private String postId;
	private String content;
	private String userId;
	
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public void setPostId(String postId) {
		this.postId = postId;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getCommentId() {
		return this.commentId;
	}
	public String getPostId() {
		return this.postId;
	}
	public String getContent() {
		return this.content;
	}
	public String getUserId() {
		return this.userId;
	}
}
